import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialFormModule } from '../../../../shared/material/material-form.module';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { MaterialProgressModule } from '../../../../shared/material/material-progress.module';
import { SharedModule } from '../../../../shared/shared.module';

import { Observable } from 'rxjs';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { PageTitleComponent } from '../../../../shared/components/page-title/page-title.component';
import { Atleta } from '../../../atleta/models/atleta.model';
import { AtletaClubeCrudComponent } from '../../components/atleta-clube-crud/atleta-clube-crud';
import { AtletaDadosPessoaisFormComponent } from '../../components/atleta-dados-pessoais-form/atleta-dados-pessoais-form';
import { AtletaGraduacaoCrudComponent } from '../../components/atleta-graduacao-crud/atleta-graduacao-crud';
import { AtletasService, updateAtletaPCDRequest } from '../../services/atletas.service';
import { AtletaFotoComponent } from '../../../atleta/components/atleta-foto/atleta-foto.component';
import { AtletaPcdFormComponent } from '../../components/atleta-pcd-form/atleta-pcd-form';

@Component({
  selector: 'app-atleta-crud',
  templateUrl: './atleta-crud.component.html',
  styleUrls: ['./atleta-crud.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialLayoutModule,
    MaterialButtonModule,
    MaterialFormModule,
    MaterialProgressModule,
    PageTitleComponent,
    AtletaDadosPessoaisFormComponent,
    AtletaGraduacaoCrudComponent,
    AtletaClubeCrudComponent,
    AtletaFotoComponent,
    AtletaPcdFormComponent
  ]
})
export class AtletaCrudComponent extends BaseComponent {

  private atletasService = inject(AtletasService);

  form!: FormGroup;
  atleta$ = new Observable<Atleta>();
  isEditing = signal<boolean>(false);
  idAtleta: number | null = null;
  isInvalid = signal<boolean>(false);
  validationErrors = signal<string[]>([]);

  constructor() {
    super();
    this.createForm();
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id']) {
      this.idAtleta = this.activatedRoute.snapshot.params['id'];
      this.isEditing.set(true);
      this.loadAtleta();
    } else {
      this.idAtleta = null;
      this.isEditing.set(false);
    }
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      atleta: [null, Validators.required],
    });
  }

  private loadAtleta(): void {
    if (this.idAtleta) {
      this.isEditing.set(true);
      this.atleta$ = this.atletasService.findById(this.idAtleta);
    } else {
      this.isEditing.set(false);
    }
  }

  private clearErrors() {
    this.isInvalid.set(false);
    this.validationErrors.set([]);
  }

  private addErrors(erros: string[]) {
    const novos = erros.filter(Boolean);
    this.validationErrors.update(prev => Array.from(new Set([...prev, ...novos])));
    if (novos.length) this.isInvalid.set(true);
  }

  atualizarAtleta(dados: any): void {
    if (dados == null) return;
    this.clearErrors();
    this.form.patchValue({ atleta: dados });
  }

  onSubmit(): void {
    this.clearErrors();
    if (this.form.valid) {
      if (this.isEditing()) {
        this.updateAtleta(this.form.value);
      } else {
        this.createAtleta(this.form.value);
      }
    } else {
      this.addErrors(['Dados obrigatórios não preenchidos.']);
    }
  }

  private createAtleta(data: any): void {
    this.atletasService.create(data.atleta).subscribe({
      next: (_response: Atleta) => {
        this.msgService.msgSucesso('Atleta cadastrado com sucesso! Realize os cadastros de clube e graduação.');
      },
      error: (error: any) => {
        console.error('Erro ao criar atleta:', error);
      }
    });
  }

  private updateAtleta(data: any): void {
    if (this.idAtleta) {
      const atleta = { id: this.idAtleta, ...data.atleta };
      this.atletasService.update(this.idAtleta, atleta).subscribe({
        next: (_response: Atleta) => {
          this.msgService.msgSucesso('Atleta atualizado com sucesso!');
        },
        error: (error: any) => {
          console.error('Erro ao atualizar atleta:', error);
        }
      });
    }
  }

  updatePcd($event: any) {
    const updatePcd: updateAtletaPCDRequest = {
      id: this.idAtleta!,
      isPcd: $event.isPcd,
      deficienciaTipo: $event.deficienciaTipo,
      deficienciaDescricao: $event.deficienciaDescricao,
      deficienciaCID: $event.deficienciaCID,
      urlLaudoMedico: $event.urlLaudoMedico
    };
    this.atletasService.atualizarAtletaPCD(updatePcd).subscribe({
      next: (_response: any) => {
        this.msgService.msgSucesso('Informações PCD atualizadas com sucesso!');
      },
      error: (error: any) => {
        console.error('Erro ao atualizar informações PCD:', error);
      }
    });
  }

  onDelete(): void {
    if (this.isEditing() && this.idAtleta) {
      const msg: any = 'Deseja realmente remover este atleta?';
      const confirmData: ConfirmDialogData = {
        title: 'Remover Atleta',
        alertMsg: '',
        confirmMsg: msg
      };
      const dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent, {
        height: 'auto',
        width: '40%',
        disableClose: true,
        data: confirmData
      });
      dialogRefConfirm.afterClosed().subscribe(result => {
        if (result === true) {
          this.deleteAtleta();
        }
      });
    }
  }

  private deleteAtleta(): void {
    if (this.idAtleta) {
      this.atletasService.delete(this.idAtleta).subscribe({
        next: () => {
          this.msgService.msgSucesso('Atleta excluído com sucesso');
          this.router.navigate(['/atletas']);
        },
        error: (error: any) => {
          this.msgService.msgErro('Erro ao excluir atleta: ' + error);
        }
      });
    } else {
      this.msgService.msgErro('Atleta não encontrado para exclusão');
      return;
    }
  }

  onCancel(): void {
    this.router.navigate(['/atletas']);
  }

  atualizarFotoUrl(url: string) {
    const atleta = this.form.value.atleta;
    atleta.urlFoto = url;
    this.form.patchValue({ atleta });
    this.onSubmit();
  }

  dadosPessoaisInvalidos(erros: string[]) {
    this.addErrors(erros);
    this.form.patchValue({ atleta: null });
  }

  fotoInvalida(error: boolean) {
    if (error) {
      this.addErrors(['Foto inválida ou erro ao carregar a foto.']);
    }
  }
}
