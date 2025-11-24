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
import { EnderecoComponent } from '../../../../shared/components/endereco/endereco.component';
import { PageTitleComponent } from '../../../../shared/components/page-title/page-title.component';
import { Atleta } from '../../../atleta/models/atleta.model';
import { GraduacaoSelectComponent } from '../../../graduacao/components/graduacao-select/graduacao-select.component';
import { AtletaDadosPessoaisFormComponent } from '../../components/atleta-dados-pessoais-form/atleta-dados-pessoais-form';
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
    EnderecoComponent,
    GraduacaoSelectComponent,
    AtletaDadosPessoaisFormComponent
  ]
})
export class AtletaCrudComponent extends BaseComponent{

  private atletasService = inject(AtletasService);

  // Propriedades do componente
  form!: FormGroup;
  atleta = signal<Atleta | null>(null);
  isEditing = signal<boolean>(false);

  ngOnInit(): void {
    this.initializeForm();
    this.loadAtleta();
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      // Dados Pessoais
      nomeAtleta: ['', [Validators.required, Validators.minLength(2)]],
      dataNascimento: ['', Validators.required],
      sexo: ['', Validators.required],
      nacionalidade: ['Brasileira'],
      naturalidade: [''],
      categoria: [''],

      // Documentos
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      rg: [''],
      rgOrgao: [''],
      rgEstado: [''],
      certidaoNascimento: [''],

      // Endereço
      endereco:[null,Validators.required],

      // Contato
      email: ['', [Validators.email]],
      telefone: [''],

      // Informações Familiares
      nomePai: [''],
      nomeMae: [''],
      filiacaoPai: [''],
      filiacaoMae: [''],

      // Informações do Karatê
      nomeClube: [''],
      dataFaixa: [''],
      diaAnuidade: [null],
      mesAnuidade: [null],

      // Status e Observações
      ativo: [true],
      chkArbitro: [false],
      chkAvaliador: [false],
      chkArbitroCategoria: [false],
      pcd: [false],
      urlFoto: [''],
      observacao: ['']
    });
  }

  private loadAtleta(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    if (id && id !== 'new') {
      this.isEditing.set(true);

      this.atletasService.findById(parseInt(id)).subscribe({
        next: (atleta: Atleta) => {
          this.atleta.set(atleta);
          this.populateForm(atleta);
          console.log('Atleta carregado para edição:', this.atleta());
        },
        error: (error: any) => {
          console.error('Erro ao carregar atleta:', error);
          this.router.navigate(['/atletas']);
        }
      });
    } else {
      this.isEditing.set(false);
    }
  }

  private populateForm(atleta: Atleta): void {
    this.form.patchValue({
      nomeAtleta: atleta.nomeAtleta,
      dataNascimento: atleta.dataNascimento,
      sexo: atleta.sexo,
      nacionalidade: atleta.nacionalidade,
      naturalidade: atleta.naturalidade,
      categoria: atleta.categoria,
      cpf: atleta.documentos?.cpf,
      rg: atleta.documentos?.rg,
      rgOrgao: atleta.documentos?.rgOrgao,
      rgEstado: atleta.documentos?.rgEstado,
      certidaoNascimento: atleta.documentos?.certidaoNascimento,
      endereco: atleta.endereco,
      email: atleta.contato?.email,
      telefone: atleta.contato?.telefone,
      nomePai: atleta.nomePai,
      nomeMae: atleta.nomeMae,
      filiacaoPai: atleta.filiacaoPai,
      filiacaoMae: atleta.filiacaoMae,
      nomeClube: atleta.nomeClube,
      dataFaixa: atleta.dataFaixa,
      diaAnuidade: atleta.diaAnuidade,
      mesAnuidade: atleta.mesAnuidade,
      ativo: atleta.ativo,
      chkArbitro: atleta.chkArbitro,
      chkAvaliador: atleta.chkAvaliador,
      chkArbitroCategoria: atleta.chkArbitroCategoria,
      pcd: atleta.pcd,
      urlFoto: atleta.urlFoto,
      observacao: atleta.observacao
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.prepareFormData();

      if (this.isEditing()) {
        // Atualizar atleta existente
        this.updateAtleta(formData);
      } else {
        // Criar novo atleta
        this.createAtleta(formData);
      }
    } else {
      this.markFormGroupTouched();
      console.log('Formulário inválido', this.form.errors);
    }
  }

  private prepareFormData(): any {
    const formValue = this.form.value;

    return {
      id: this.isEditing() ? this.atleta()?.id : undefined,
      nomeAtleta: formValue.nomeAtleta,
      dataNascimento: formValue.dataNascimento,
      sexo: formValue.sexo,
      nacionalidade: formValue.nacionalidade,
      naturalidade: formValue.naturalidade,
      categoria: formValue.categoria,
      nomePai: formValue.nomePai,
      nomeMae: formValue.nomeMae,
      filiacaoPai: formValue.filiacaoPai,
      filiacaoMae: formValue.filiacaoMae,
      nomeClube: formValue.nomeClube,
      dataFaixa: formValue.dataFaixa,
      diaAnuidade: formValue.diaAnuidade,
      mesAnuidade: formValue.mesAnuidade,
      ativo: formValue.ativo,
      chkArbitro: formValue.chkArbitro,
      chkAvaliador: formValue.chkAvaliador,
      chkArbitroCategoria: formValue.chkArbitroCategoria,
      pcd: formValue.pcd,
      urlFoto: formValue.urlFoto,
      observacao: formValue.observacao,
      documentos: {
        cpf: formValue.cpf,
        rg: formValue.rg,
        rgOrgao: formValue.rgOrgao,
        rgEstado: formValue.rgEstado,
        certidaoNascimento: formValue.certidaoNascimento
      },
      endereco: formValue.endereco,
      contato: {
        email: formValue.email,
        telefone: formValue.telefone
      }
    };
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
    const atletaId = this.atleta()?.id;
    if (atletaId) {
      this.atletasService.update(atletaId, data).subscribe({
        next: (response: Atleta) => {
          console.log('Atleta atualizado com sucesso:', response);
          this.router.navigate(['/atletas']);
        },
        error: (error: any) => {
          console.error('Erro ao atualizar atleta:', error);
        }
      });
    }
  }

  onDelete(): void {
    if (this.isEditing() && this.atleta()) {
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
    this.atletasService.delete(this.atleta()!.id).subscribe({
      next: () => {
        this.msgService.msgSucesso('Atleta excluído com sucesso');
        this.router.navigate(['/atletas']);
      },
      error: (error: any) => {
        this.msgService.msgErro('Erro ao excluir atleta: ' + error);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/atletas']);
  }

  // Métodos auxiliares para validação
  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return `${this.getFieldLabel(fieldName)} é obrigatório`;
    }

    if (field?.hasError('email')) {
      return 'Email deve ter um formato válido';
    }

    if (field?.hasError('pattern')) {
      if (fieldName === 'cpf') return 'CPF deve ter o formato 000.000.000-00';
      if (fieldName === 'cep') return 'CEP deve ter o formato 00000-000';
    }

    if (field?.hasError('minlength')) {
      return `${this.getFieldLabel(fieldName)} deve ter pelo menos ${field.errors?.['minlength'].requiredLength} caracteres`;
    }

    return 'Campo inválido';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      nomeAtleta: 'Nome do Atleta',
      dataNascimento: 'Data de Nascimento',
      sexo: 'Sexo',
      cpf: 'CPF',
      email: 'Email',
      cep: 'CEP'
    };

    return labels[fieldName] || fieldName;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
  }
}
