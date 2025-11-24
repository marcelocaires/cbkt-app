import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialFormModule } from '../../../../shared/material/material-form.module';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { SharedModule } from '../../../../shared/shared.module';
import { Atleta } from '../../../atleta/models/atleta.model';

export interface AtletaDadosPessoais {
  nomeAtleta: string;
  dataNascimento: string;
  sexo: string;
  nacionalidade?: string;
  naturalidade?: string;
  nomePai?: string;
  nomeMae?: string;
}

@Component({
  selector: 'app-atleta-dados-pessoais-form',
  templateUrl: './atleta-dados-pessoais-form.html',
  styleUrls: ['./atleta-dados-pessoais-form.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MaterialLayoutModule,
    MaterialButtonModule,
    MaterialFormModule
  ]
})
export class AtletaDadosPessoaisFormComponent extends BaseComponent{
  atleta=input<Atleta|null>(null);
  dadosValidos=output<any>();
  form: FormGroup={} as FormGroup;
  initialData: AtletaDadosPessoais | null = null;

  ngOnInit(): void {
    if(this.atleta()){
      const atleta:any=this.atleta();
      this.initialData = {
        nomeAtleta: atleta.nomeAtleta,
        dataNascimento: atleta.dataNascimento,
        sexo: atleta.sexo,
        nacionalidade: atleta.nacionalidade || '',
        naturalidade: atleta.naturalidade || '',
        nomePai: atleta.nomePai || '',
        nomeMae: atleta.nomeMae || ''
      };
    }
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      nomeAtleta: [
        this.initialData?.nomeAtleta || '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
          Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)
        ]
      ],
      dataNascimento: [
        this.initialData?.dataNascimento || '',
        [
          Validators.required,
          this.dateValidator
        ]
      ],
      sexo: [
        this.initialData?.sexo || '',
        [Validators.required]
      ],
      nacionalidade: [
        this.initialData?.nacionalidade || 'Brasileira',
        [
          Validators.maxLength(50),
          Validators.pattern(/^[a-zA-ZÀ-ÿ\s]*$/)
        ]
      ],
      naturalidade: [
        this.initialData?.naturalidade || '',
        [
          Validators.maxLength(100),
          Validators.pattern(/^[a-zA-ZÀ-ÿ\s]*$/)
        ]
      ],
      nomePai: [
        this.initialData?.nomePai || '',
        [
          Validators.maxLength(100),
          Validators.pattern(/^[a-zA-ZÀ-ÿ\s]*$/)
        ]
      ],
      nomeMae: [
        this.initialData?.nomeMae || '',
        [
          Validators.maxLength(100),
          Validators.pattern(/^[a-zA-ZÀ-ÿ\s]*$/)
        ]
      ]
    });
  }

  /**
   * Validador personalizado para data de nascimento
   */
  private dateValidator(control: any) {
    if (!control.value) return null;

    const date = new Date(control.value);
    const today = new Date();
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 100); // Máximo 100 anos atrás

    if (date > today) {
      return { futureDate: true };
    }

    if (date < minDate) {
      return { tooOldDate: true };
    }

    return null;
  }

  /**
   * Retorna mensagem de erro apropriada para cada campo
   */
  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (!field || !field.errors) return '';

    const errors = field.errors;

    // Mensagens específicas por campo
    const fieldMessages: { [key: string]: { [error: string]: string } } = {
      nomeAtleta: {
        required: 'Nome do atleta é obrigatório',
        minlength: 'Nome deve ter pelo menos 2 caracteres',
        maxlength: 'Nome não pode ter mais de 100 caracteres',
        pattern: 'Nome deve conter apenas letras e espaços'
      },
      dataNascimento: {
        required: 'Data de nascimento é obrigatória',
        futureDate: 'Data de nascimento não pode ser futura',
        tooOldDate: 'Data de nascimento não pode ser anterior a 100 anos'
      },
      sexo: {
        required: 'Sexo é obrigatório'
      },
      nacionalidade: {
        maxlength: 'Nacionalidade não pode ter mais de 50 caracteres',
        pattern: 'Nacionalidade deve conter apenas letras e espaços'
      },
      naturalidade: {
        maxlength: 'Naturalidade não pode ter mais de 100 caracteres',
        pattern: 'Naturalidade deve conter apenas letras e espaços'
      },
      nomePai: {
        maxlength: 'Nome do pai não pode ter mais de 100 caracteres',
        pattern: 'Nome do pai deve conter apenas letras e espaços'
      },
      nomeMae: {
        maxlength: 'Nome da mãe não pode ter mais de 100 caracteres',
        pattern: 'Nome da mãe deve conter apenas letras e espaços'
      }
    };

    const messages = fieldMessages[fieldName] || {};

    // Retorna a primeira mensagem de erro encontrada
    for (const errorType in errors) {
      if (messages[errorType]) {
        return messages[errorType];
      }
    }

    return 'Campo inválido';
  }

  /**
   * Retorna os dados do formulário
   */
  getFormData(): AtletaDadosPessoais {
    return this.form.value;
  }

  /**
   * Verifica se o formulário é válido
   */
  isFormValid(): boolean {
    return this.form.valid;
  }

  /**
   * Marca todos os campos como touched para exibir erros
   */
  markAllFieldsAsTouched(): void {
    this.form.markAllAsTouched();
  }

  /**
   * Reseta o formulário para os valores iniciais
   */
  resetForm(): void {
    this.form.reset();
    this.initializeForm();
  }

  /**
   * Atualiza os dados do formulário
   */
  updateFormData(data: Partial<AtletaDadosPessoais>): void {
    this.form.patchValue(data);
  }
}
