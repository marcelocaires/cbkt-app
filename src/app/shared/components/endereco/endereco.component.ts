import { Component, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialButtonModule } from '../../material/material-button.module';
import { MaterialFormModule } from '../../material/material-form.module';
import { MaterialProgressModule } from '../../material/material-progress.module';
import { EnderecoResponse, EnderecoService } from '../../services/endereco.service';
import { SharedModule } from '../../shared.module';

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
export class EnderecoComponent {
  form: FormGroup;
  loading = signal(false);
  endereco= output<Endereco>();

  constructor(
    private fb: FormBuilder,
    private enderecoService: EnderecoService
  ) {
    this.form = this.fb.group({
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
        this.endereco.emit(this.form.value);
      }
    });
  }

  buscarCep(): void {
    const cep = this.form.get('cep')?.value;

    if (!cep || this.form.get('cep')?.invalid) {
      return;
    }

    this.loading.set(true);

    this.enderecoService.buscarEnderecoPorCep(cep).subscribe({
      next: (endereco: EnderecoResponse) => {
        if (endereco.erro) {
          alert('CEP não encontrado!');
          this.limparEndereco();
        } else {
          this.preencherEndereco(endereco);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Erro ao buscar CEP:', error);
        alert('Erro ao buscar CEP. Tente novamente.');
        this.loading.set(false);
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

    // Focar no campo número após preencher
    setTimeout(() => {
      document.getElementById('numero')?.focus();
    }, 100);
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
