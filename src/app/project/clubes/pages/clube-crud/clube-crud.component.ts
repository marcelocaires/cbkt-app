import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialFormModule } from '../../../../shared/material/material-form.module';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { MaterialProgressModule } from '../../../../shared/material/material-progress.module';
import { SharedModule } from '../../../../shared/shared.module';

import { BaseComponent } from '../../../../shared/components/base/base.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { EnderecoComponent, Endereco as EnderecoValue } from '../../../../shared/components/endereco/endereco.component';
import { PageTitleComponent } from '../../../../shared/components/page-title/page-title.component';
import { Clube } from '../../../atleta/models/atleta.model';
import { MandatoCrudComponent } from '../../../mandatos/components/mandato-crud/mandato-crud.component';
import { ClubeService } from '../../services/clube.service';
import { ClubeCompleto } from '../../models/clube-completo.model';

@Component({
  selector: 'app-clube-crud',
  templateUrl: './clube-crud.component.html',
  styleUrls: ['./clube-crud.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialLayoutModule,
    MaterialFormModule,
    MaterialProgressModule,
    MaterialButtonModule,
    PageTitleComponent,
    EnderecoComponent,
    MandatoCrudComponent
  ]
})
export class ClubeCrudComponent extends BaseComponent {
  private clubeService = inject(ClubeService);

  form!: FormGroup;
  isEditing = false;
  isLoading = false;
  idClube: number | null = null;
  isInvalid = signal<boolean>(false);
  validationErrors = signal<string[]>([]);
  clube: ClubeCompleto | null = null;

  constructor() {
    super();
    this.form = this.createForm();
  }

  ngOnInit(): void {
    const idParam = this.activatedRoute.snapshot.params['id'];
    if (idParam) {
      this.idClube = Number(idParam);
      this.isEditing = true;
      this.loadClube(this.idClube);
    }
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      nome: ['', [Validators.required, Validators.maxLength(120)]],
      abreviatura: ['', [Validators.maxLength(20)]],
      classificacao: ['', [Validators.maxLength(60)]],
      cnpj: ['', [Validators.maxLength(18)]],
      dataFundacao: [null],
      contato: this.formBuilder.group({
        email: ['', [Validators.email, Validators.maxLength(120)]],
        telefone: ['', [Validators.maxLength(20)]],
      }),
      diretoria: this.formBuilder.group({
        responsavel: ['', [Validators.maxLength(120)]],
        presidente: ['', [Validators.maxLength(120)]],
        diretorTecnico: ['', [Validators.maxLength(120)]],
      }),
      endereco: [null]
    });
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

  onEnderecoChange(endereco: EnderecoValue) {
    this.clearErrors();
    const ctrl = this.form.get('endereco');
    if (ctrl) {
      ctrl.setValue(endereco, { emitEvent: false });
    }
  }

  onEnderecoInvalid(msg: string) {
    this.addErrors([msg || 'Endereço inválido ou incompleto.']);
    this.isInvalid.set(true);
  }

  private loadClube(id: number): void {
    this.isLoading = true;
    this.clubeService.getClubeCompleto(id).subscribe({
      next: (clube: ClubeCompleto) => {
        this.clube = clube;
        this.populateForm(clube);
        this.isLoading = false;
      },
      error: () => {
        this.msgService.msgErro('Erro ao carregar clube.');
        this.isLoading = false;
      }
    });
  }

  private populateForm(clube: ClubeCompleto): void {
    this.form.patchValue({
      id: clube.id,
      nome: clube.nome,
      abreviatura: clube.abreviatura,
      classificacao: clube.classificacao,
      cnpj: clube.cnpj,
      dataFundacao: clube.dataFundacao,
      contato: clube.contato,
      diretoria: clube.diretoria,
      endereco: clube.endereco
    });
  }

  onSubmit(): void {
    this.clearErrors();
    if (this.form.invalid) {
      this.markFormGroupTouched();
      this.addErrors(['Dados obrigatórios não preenchidos.']);
      this.msgService.msgErro('Por favor, corrija os campos obrigatórios.');
      return;
    }

    this.isLoading = true;
    const payload: any = this.form.value;

    if (this.isEditing) {
      this.clubeService.update(payload).subscribe({
        next: () => {
          this.msgService.msgSucesso('Clube atualizado com sucesso!');
          this.isLoading = false;
          this.router.navigate(['/clubes']);
        },
        error: () => {
          this.addErrors(['Erro ao atualizar clube.']);
          this.msgService.msgErro('Erro ao atualizar clube.');
          this.isLoading = false;
        }
      });
      return;
    }

    this.clubeService.create(this.form).subscribe({
      next: () => {
        this.msgService.msgSucesso('Clube cadastrado com sucesso!');
        this.isLoading = false;
        this.router.navigate(['/clubes']);
      },
      error: () => {
        this.addErrors(['Erro ao cadastrar clube.']);
        this.msgService.msgErro('Erro ao cadastrar clube.');
        this.isLoading = false;
      }
    });
  }

  onDelete(): void {
    if (!this.isEditing || !this.idClube) {
      return;
    }

    const confirmData: ConfirmDialogData = {
      title: 'Remover Clube',
      alertMsg: '',
      confirmMsg: 'Deseja realmente remover este clube?'
    };

    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      height: 'auto',
      width: '40%',
      disableClose: true,
      data: confirmData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const payload: Clube = { ...this.form.value, id: this.idClube } as Clube;
        this.clubeService.delete(payload).subscribe({
          next: () => {
            this.msgService.msgSucesso('Clube excluído com sucesso.');
            this.router.navigate(['/clubes']);
          },
          error: () => {
            this.msgService.msgErro('Erro ao excluir clube.');
          }
        });
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/clubes']);
  }

  private markFormGroupTouched(): void {
    Object.values(this.form.controls).forEach(control => {
      if (control instanceof FormGroup) {
        Object.values(control.controls).forEach(inner => inner.markAsTouched());
      }
      control.markAsTouched();
    });
  }

  getErrorMessage(field: string): string {
    const control = this.form.get(field);
    if (!control) return '';

    if (control.hasError('required')) return 'Campo obrigatório';
    if (control.hasError('email')) return 'E-mail inválido';
    if (control.hasError('maxlength')) return 'Tamanho máximo excedido';
    return '';
  }
}
