import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialFormModule } from '../../../../shared/material/material-form.module';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-atleta-documentos-form',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MaterialLayoutModule,
    MaterialButtonModule,
    MaterialFormModule
  ],
  templateUrl: './atleta-documentos-form.html',
  styleUrl: './atleta-documentos-form.scss',
})
export class AtletaDocumentosForm {
  form: FormGroup={} as FormGroup;
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
}
