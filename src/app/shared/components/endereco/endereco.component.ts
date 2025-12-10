import { Component, ElementRef, inject, input, output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MaterialButtonModule } from '../../material/material-button.module';
import { MaterialFormModule } from '../../material/material-form.module';
import { MaterialProgressModule } from '../../material/material-progress.module';
import { EnderecoResponse, EnderecoService } from '../../services/endereco.service';
import { SharedModule } from '../../shared.module';
import { BaseComponent } from '../base/base.component';

export interface Endereco {
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

@Component({
  selector: 'app-endereco',
  standalone: true,
  imports: [SharedModule, MaterialFormModule, MaterialButtonModule, MaterialProgressModule],
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent extends BaseComponent{
  endereco = input<Endereco | null | undefined>(null);
  enderecoEvent = output<Endereco>();
  elementRef = inject(ElementRef);
  form: FormGroup;
  enderecoService = inject(EnderecoService);
  isCepNaoEncontrado = false;

  constructor() {
    super();
    this.form = this.formBuilder.group({
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required]
    });

    // Emitir o endereço completo quando o formulário for válido
    this.form.valueChanges.subscribe(() => {
      if (this.form.valid) {
        this.enderecoEvent.emit(this.form.value);
      }
    });
  }

  ngOnChanges(): void {
    if(this.endereco()) {
      this.initEndereco(this.endereco());
    }
  }

  buscarCep(): void {
    const cep = this.form.get('cep')?.value;

    if (!cep || this.form.get('cep')?.invalid) {
      return;
    }

    this.enderecoService.buscarEnderecoViaCep(cep).subscribe({
      next: (endereco: EnderecoResponse) => {
        if (endereco && endereco.erro) {
          this.msgService.msgErro('CEP não encontrado!');
          //this.limparEndereco();
          this.isCepNaoEncontrado = true;
        } else {
          this.preencherEndereco(endereco);
          this.isCepNaoEncontrado = false;
        }
      },
      error: (error) => {
        console.error('Erro ao buscar CEP:', error);
        alert('Erro ao buscar CEP. Tente novamente.');
      }
    });
  }

  private preencherEndereco(endereco: EnderecoResponse): void {
    this.form.patchValue({
      logradouro: endereco.logradouro,
      complemento: endereco.complemento,
      bairro: endereco.bairro,
      cidade: endereco.localidade,
      estado: endereco.uf
    });
    this.numeroFocus();
  }

  private initEndereco(endereco: Endereco|null|undefined): void {
    if (endereco) {
      this.form.patchValue({
        cep: endereco.cep,
        logradouro: endereco.logradouro,
        complemento: endereco.complemento,
        numero: endereco.numero,
        bairro: endereco.bairro,
        cidade: endereco.cidade,
        estado: endereco.estado
      });
      if(endereco.cep && endereco.cep !== '') {
        this.buscarCep();
      }
    }
    this.numeroFocus();
  }

  private limparEndereco(): void {
    this.form.patchValue({
      logradouro: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: ''
    });
  }

  private numeroFocus(): void {
    setTimeout(() => {
      this.elementRef.nativeElement.querySelector('#numero')?.focus();
    }, 100);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (field?.hasError('pattern')) {
      return 'CEP inválido';
    }

    return '';
  }
}
