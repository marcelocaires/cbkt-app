import { Component, inject, Input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialFormModule } from '../../../../shared/material/material-form.module';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { Pessoa, PessoaService } from '../../services/pessoa.service';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-consulta-pessoa',
  templateUrl: './consulta-pessoa.component.html',
  styleUrls: ['./consulta-pessoa.component.scss'],
  standalone: true,
  imports: [
    SharedModule,
    MaterialFormModule,
    MaterialLayoutModule,
    MaterialButtonModule
  ]
})
export class ConsultaPessoaComponent implements OnInit {
  private fb = inject(FormBuilder);
  private pessoaService = inject(PessoaService);
  value=output<any>();

  searchForm!: FormGroup;
  pessoaForm!: FormGroup;

  isSearched = false;

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      cpf: [null, [Validators.required]]
    });

    this.pessoaForm = this.fb.group({
      id: [null],
      nome: [null,[ Validators.required ]],
      cpf: [null,[ Validators.required ]],
      dataNascimento: [null,[ Validators.required ]],
      email: [null,[ Validators.required ]],
      telefone: [null,[ Validators.required ]],
      tipo: [null],
      ativo: [true]
    });

    this.pessoaForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.value.emit(this.pessoaForm.value);
      }
    });
  }

  onSearch(): void {
    if (this.searchForm.invalid) {
      return;
    }
    const cpf = this.searchForm.value.cpf;
    this.pessoaService.getPessoaByCpf(cpf)
      .subscribe({
        next: (p: Pessoa) => {
          this.populateForm(p);
          this.isSearched = true;
        },
        error: (err) => {
          if (err && err.status === 404) {
            // pessoa não encontrada -> permitir cadastro
            this.pessoaForm.reset();
            this.pessoaForm.patchValue({ cpf });
            this.isSearched = true;
          }
        }
      });
  }

  populateForm(p: Pessoa | null): void {
    if (!p) {
      this.pessoaForm.reset();
      return;
    }
    this.pessoaForm.patchValue({
      id: p.id,
      nome: p.nome,
      cpf: p.cpf,
      dataNascimento: p.dataNascimento,
      email: p.email,
      telefone: p.telefone,
      tipo: p.tipo,
      ativo: p.ativo
    });
  }

  clear(): void {
    this.searchForm.reset();
    this.pessoaForm.reset();
    this.isSearched = false;
  }

  get isClear(): boolean {
    return this.searchForm.dirty;
  }

}
