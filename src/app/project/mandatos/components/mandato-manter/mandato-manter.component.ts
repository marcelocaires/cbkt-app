import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { PageTitleComponent } from '../../../../shared/components/page-title/page-title.component';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { Pessoa } from '../../../pessoas/services/pessoa.service';
import { Mandato, MandatoCargo, MandatoCargoRequest, MandatoComCargosRequest, MandatoService } from '../../services/mandato.service';
import { MandatoCargoManterComponent } from '../mandato-cargo-manter/mandato-cargo-manter.component';

@Component({
  selector: 'app-mandato-manter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MaterialLayoutModule,
    PageTitleComponent,
    MandatoCargoManterComponent
],
  templateUrl: './mandato-manter.component.html',
  styleUrls: ['./mandato-manter.component.scss']
})
export class MandatoManterComponent extends BaseComponent implements OnInit {
  private mandatoService = inject(MandatoService);

  // Inputs
  tipoEntidade = input.required<'CLUBE' | 'FEDERACAO' | 'CONFEDERACAO'>();
  entidade = input.required<any>();
  mandato = input<Mandato | null>(null);
  // Outputs
  salvar = output<any>();
  cancelar = output<void>();

  // Signals
  mandatoForm: FormGroup={} as FormGroup;
  cargos = signal<MandatoCargo[]>([]);
  pessoasDisponiveis = signal<Pessoa[]>([]);
  modoEdicao = signal(false);

  constructor() {
    super();

    this.initForm();

    // Effect para carregar dados quando mandato mudar
    effect(() => {
      const mandatoAtual = this.mandato();
      if (mandatoAtual) {
        this.carregarDadosMandato(mandatoAtual);
      }
    });
  }

  ngOnInit() {
    // Se já tem um mandato, carregar seus dados
    if (this.mandato()) {
      this.carregarDadosMandato(this.mandato()!);
    }
  }

  initForm() {
    this.mandatoForm = this.formBuilder.group({
      dataInicio: [null, Validators.required],
      dataFim: [null],
      descricao: [null, Validators.required],
      cargos: [null, Validators.required]
    });
  }

  carregarDadosMandato(mandato: Mandato) {
    if(mandato==null) return;

    this.modoEdicao.set(true);

    // Preencher formulário
    this.mandatoForm.patchValue({
      dataInicio: mandato.dataInicio,
      dataFim: mandato.dataFim,
      descricao: mandato.descricao,
      cargos: mandato.cargos || []
    });
  }

  onSalvar() {
    if (this.mandatoForm.invalid) {
      this.mandatoForm.markAllAsTouched();
      return;
    }

    const formValue = this.mandatoForm.value;

    if (this.modoEdicao() && this.mandato()?.id) {
      // Modo edição - atualizar mandato existente
      const mandatoAtualizado: Mandato = {
        ...this.mandato()!,
        ...formValue
      };

      this.mandatoService.update(mandatoAtualizado).subscribe({
        next: (mandato) => {
          this.salvar.emit(mandato);
          this.msgService.msgSucesso('Mandato salvo com sucesso.');
        },
        error: (err) => console.error('Erro ao atualizar mandato:', err)
      });
    } else {
      const cargos=this.mandatoForm.value.cargos.map((cargo:any)=>{
        return {
          pessoa:cargo.pessoa,
          cargo:cargo.cargo,
          tipoVinculo:cargo.tipoVinculo,
          dataInicio:cargo.dataInicio,
          dataFim:cargo.dataFim,
          ativo:cargo.ativo,
          substituiuId:cargo.substituiuId,
          motivoSaida:cargo.motivoSaida,
          observacao:cargo.observacao
        } as MandatoCargoRequest;
      });
      const request:MandatoComCargosRequest={
        tipoEntidade: this.tipoEntidade(),
        entidadeId: this.entidade().id,
        dataInicio: formValue.dataInicio,
        dataFim: formValue.dataFim,
        descricao: formValue.descricao,
        cargos: cargos
      }
      this.mandatoService.criarMandatoComCargos(request).subscribe({
        next: (mandato) => {
          this.salvar.emit(mandato);
          this.msgService.msgSucesso('Mandato criado com sucesso.');
        },
        error: (err) => console.error('Erro ao criar mandato:', err)
      });
    }
  }

  onCancelar() {
    this.cancelar.emit();
  }

  isFormValido(): boolean {
    return this.mandatoForm.valid;
  }

  getTitulo(): string {
    return this.modoEdicao() ? 'Editar Mandato' : 'Novo Mandato';
  }

  atualizarCargos(cargos: any) {
    this.mandatoForm.patchValue({
      cargos: cargos
    });
  }
}
