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
import { AtletasService } from '../../services/atletas.service';

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
    AtletaClubeCrudComponent
  ]
})
export class AtletaCrudComponent extends BaseComponent{

  private atletasService = inject(AtletasService);

  form!: FormGroup;
  atleta$=new Observable<Atleta>();
  isEditing = signal<boolean>(false);
  idAtleta:number|null=null;

  constructor(){
    super();
    this.createForm();
  }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params['id']){
      this.idAtleta=this.activatedRoute.snapshot.params['id'];
      this.isEditing.set(true);
      this.loadAtleta();
    }else{
      this.idAtleta=null;
      this.isEditing.set(false);
    }
  }

  atualizarAtleta(dados: any): void {
    this.form.patchValue({atleta:dados});
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      atleta: [null, Validators.required],
    });
  }

  private loadAtleta(): void {
    if(this.idAtleta) {
      this.isEditing.set(true);
      this.atleta$=this.atletasService.findById(this.idAtleta);
    } else {
      this.isEditing.set(false);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.isEditing()) {
        this.updateAtleta(this.form.value);
      } else {
        this.createAtleta(this.form.value);
      }
    }
  }

  private createAtleta(data: any): void {
    this.atletasService.create(data).subscribe({
      next: (response: Atleta) => {
        console.log('Atleta criado com sucesso:', response);
        this.router.navigate(['/atletas']);
      },
      error: (error: any) => {
        console.error('Erro ao criar atleta:', error);
      }
    });
  }

  private updateAtleta(data: any): void {
    if (this.idAtleta) {
      const atleta={
        id:this.idAtleta,
        ...data.atleta
      }
      this.atletasService.update(this.idAtleta,atleta).subscribe({
        next: (response: Atleta) => {
          this.msgService.msgSucesso('Atleta atualizado com sucesso!');
          //this.router.navigate(['/atletas']);
        },
        error: (error: any) => {
          console.error('Erro ao atualizar atleta:', error);
        }
      });
    }
  }

  onDelete(): void {
    if (this.isEditing() && this.idAtleta) {
      let msg:any="Deseja realmente remover este atleta?";
      const confirmData:ConfirmDialogData={
        title:"Remover Atleta",
        alertMsg:"",
        confirmMsg:msg
      }
      const dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent, {
        height: 'auto',
        width: '40%',
        disableClose: true,
        data:confirmData
      });
      dialogRefConfirm.afterClosed().subscribe(result => {
        console.log('Dialog result:', result);
        if (result === true) {
          this.deleteAtleta();
        }
      });
    }
  }

  private deleteAtleta(): void {
    if(this.idAtleta) {
      this.atletasService.delete(this.idAtleta).subscribe({
        next: () => {
          this.msgService.msgSucesso('Atleta excluído com sucesso');
          this.router.navigate(['/atletas']);
        },
        error: (error: any) => {
          this.msgService.msgErro('Erro ao excluir atleta: ' + error);
        }
      });
    }else{
      this.msgService.msgErro('Atleta não encontrado para exclusão');
      return;
    }
  }

  onCancel(): void {
    this.router.navigate(['/atletas']);
  }
}
