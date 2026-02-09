import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { EnderecoComponent } from '../../../../shared/components/endereco/endereco.component';
import { DateMaskDirective } from '../../../../shared/directives/date-mask.directive';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialFormModule } from '../../../../shared/material/material-form.module';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { SharedModule } from '../../../../shared/shared.module';
import { Atleta } from '../../../atleta/models/atleta.model';
import { AtletaContatoForm } from '../atleta-contato-form/atleta-contato-form';
import { AtletaDocumentosForm } from '../atleta-documentos-form/atleta-documentos-form';

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
    MaterialFormModule,
    EnderecoComponent,
    AtletaDocumentosForm,
    AtletaContatoForm,
    DateMaskDirective
  ]
})
export class AtletaDadosPessoaisFormComponent extends BaseComponent{
  atleta=input<Atleta|null>(null);
  valor=output<any>();
  form: FormGroup ={} as FormGroup;
  onInvalid=output<any>();
  erros:string[]=[];

  constructor(){
    super();
    this.createForm();
    if(this.form && this.form.value){
      this.form.valueChanges.subscribe(() => {
        if (this.form && this.form.valid) {
          this.valor.emit(this.form.value);
        }
        /*
        else if(this.form.dirty){
          this.onInvalid.emit(this.form.errors);
        }
          */
      });
    }
  }

  ngOnInit(): void {
    if(this.atleta()){
      this.populateForm();
    }
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      nomeAtleta: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
          Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)
        ]
      ],
      dataNascimento: [
        null,
        [
          Validators.required,
          this.dateValidator
        ]
      ],
      sexo: [
        null,
        [Validators.required]
      ],
      nacionalidade: [
        'Brasileira',
        [
          Validators.maxLength(50),
          Validators.pattern(/^[a-zA-ZÀ-ÿ\s]*$/)
        ]
      ],
      naturalidade: [
        null,
        [
          Validators.maxLength(100),
          Validators.pattern(/^[a-zA-ZÀ-ÿ\s\-:\\]*$/)
        ]
      ],
      nomePai: [
        null,
        [
          Validators.maxLength(100),
          Validators.pattern(/^[a-zA-ZÀ-ÿ\s]*$/)
        ]
      ],
      nomeMae: [
        null,
        [
          Validators.maxLength(100),
          Validators.pattern(/^[a-zA-ZÀ-ÿ\s]*$/)
        ]
      ],
      urlFoto: [null],
      endereco:[null,Validators.required],
      contato:[null,Validators.required],
      documentos:[null,Validators.required],
      ativo: [true],
      chkArbitro: [false],
      chkAvaliador: [false]
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
    this.createForm();
  }

  atualizarEndereco(endereco: any): void {
    console.log('Atualizando endereço:', endereco);
    this.form.patchValue({ endereco: endereco });
  }
  enderecoInvalido(msg: any) {
    this.form.patchValue({ endereco: null });
    this.erros.push(msg);
    this.onInvalid.emit(this.erros);
  }

  atualizarDocumentos(documentos: any): void {
    console.log('Atualizando documentos:', documentos);
    this.form.patchValue({ documentos: documentos });
  }
  documentosInvalidos(msg: any) {
    this.form.patchValue({ documentos: null });
    this.erros.push(msg);
    this.onInvalid.emit(this.erros);
  }

  atualizarContato(contato: any): void {
    console.log('Atualizando contato:', contato);
    this.form.patchValue({ contato: contato });
  }
  contatoInvalido(msg: any) {
    this.form.patchValue({ contato: null });
    this.erros.push(msg);
    this.onInvalid.emit(this.erros);
  }

  populateForm(){
    if(this.atleta()){
      this.form.get('nomeAtleta')?.setValue(this.atleta()!.nomeAtleta);
      this.form.get('dataNascimento')?.setValue(this.atleta()!.dataNascimento);
      this.form.get('sexo')?.setValue(this.atleta()!.sexo);
      this.form.get('nacionalidade')?.setValue(this.atleta()!.nacionalidade);
      this.form.get('naturalidade')?.setValue(this.atleta()!.naturalidade);
      this.form.get('nomePai')?.setValue(this.atleta()!.nomePai);
      this.form.get('nomeMae')?.setValue(this.atleta()!.nomeMae);
      this.form.get('ativo')?.setValue(this.atleta()!.ativo);
      this.form.get('chkArbitro')?.setValue(this.atleta()!.chkArbitro);
      this.form.get('chkAvaliador')?.setValue(this.atleta()!.chkAvaliador);
    }
  }
}
