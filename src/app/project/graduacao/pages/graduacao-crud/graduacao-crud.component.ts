import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { PageTitleComponent } from '../../../../shared/components/page-title/page-title.component';
import { DecimalDirective } from '../../../../shared/directives/decimal.directive';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialFormModule } from '../../../../shared/material/material-form.module';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { MaterialProgressModule } from '../../../../shared/material/material-progress.module';
import { SharedModule } from '../../../../shared/shared.module';
import { Cor, Grau, ParametroService } from '../../../services/parametro.service';
import { FaixaKarateComponent } from '../../components/faixa-karate';
import { Graduacao } from '../../model/graduacao';
import { GraduacaoStateTransferService } from '../../services/graduacao-state-transfer.service';
import { GraduacaoService } from '../../services/graduacao.service';

@Component({
  selector: 'app-graduacao-crud',
  templateUrl: './graduacao-crud.component.html',
  styleUrls: ['./graduacao-crud.component.scss'],
  standalone: true,
  imports: [
    MaterialLayoutModule,
    MaterialFormModule,
    MaterialProgressModule,
    ReactiveFormsModule,
    MaterialButtonModule,
    SharedModule,
    FaixaKarateComponent,
    DecimalDirective,
    PageTitleComponent
  ]
})
export class GraduacaoCrudComponent extends BaseComponent{
  graduacao:Graduacao | null = null;
  graduacaoId:number | null = null;
  graduacaoService=inject(GraduacaoService);
  parametrosService=inject(ParametroService);
  transferService=inject(GraduacaoStateTransferService);

  graus:Grau[] = [];
  readonly graus$:Observable<Grau[]> = this.parametrosService.getGraus().pipe(
    tap((graus: Grau[]) => {
      this.graus = graus;
    })
  );
  cores:Cor[] = [];
  readonly cores$:Observable<Cor[]> = this.parametrosService.getCores().pipe(
    tap((cores: Cor[]) => {
      this.cores = cores;
    })
  )

  form: FormGroup;
  isEditing = false;
  isLoading = false;

  corSelecionada: Cor | null = null;
  grauSelecionado: Grau | null = null;

  constructor() {
    super();
    this.form = this.createForm();
    this.graduacao = this.transferService.get();
  }

  ngOnInit(): void {
    if(this.graduacao) {
      this.populateForm(this.graduacao);
      this.isEditing = true;
    }else{
      this.isEditing = false;
    }
  }
  ngAfterViewInit(): void {
    if(this.graduacao && this.graduacao.cor)
      this.selecionarCor(this.graduacao.cor);
    if(this.graduacao && this.graduacao.grau)
      this.selecionarGrau(this.graduacao.grau);
  }

  selecionarGrau(codigo:string) {
    console.log(this.graus);
    const grau:Grau|null = this.graus.find(g => g.codigo === codigo) || null;
    this.grauSelecionado = grau;
  }
  selecionarCor(codigo:string) {
    const cor:Cor|null = this.cores.find(c => c.codigo === codigo) || null;
    this.corSelecionada = cor;
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      descricaoGraduacao: ['', [Validators.required, Validators.maxLength(100)]],
      grau: [''],
      cor: [''],
      carencia: [0, [Validators.required, Validators.min(0)]],
      carenciaMenor: [0, [Validators.min(0)]],
      valor: [0, [Validators.required, Validators.min(0)]],
      idadeMinima: [5, [Validators.required, Validators.min(0)]],
      anuidadeAte: [0, [Validators.required, Validators.min(0)]],
      anuidadeApos: [0, [Validators.required, Validators.min(0)]],
      anuidade: ['NAO', Validators.required]
    });
  }

  private populateForm(graduacao: Graduacao): void {
    this.form.patchValue({
      id: graduacao.id,
      descricaoGraduacao: graduacao.descricaoGraduacao,
      grau: graduacao.grau,
      cor: graduacao.cor,
      carencia: graduacao.carencia,
      carenciaMenor: graduacao.carenciaMenor,
      valor: graduacao.valor,
      idadeMinima: graduacao.idadeMinima,
      anuidadeAte: graduacao.anuidadeAte,
      anuidadeApos: graduacao.anuidadeApos,
      anuidade: graduacao.anuidade
    });
  }

  getContrastingColor(cor: string) {
    const color = cor.replace('#', '');
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? 'black' : 'white';
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading = true;

      const operation = this.isEditing
        ? this.graduacaoService.update(this.form.value)
        : this.graduacaoService.create(this.form);

      operation.subscribe({
        next: (response) => {
          this.msgService.msgSucesso('Graduação salva com sucesso!');
          this.isLoading = false;
          this.router.navigate(['/graduacoes']);
        },
        error: (error) => {
          this,this.msgService.msgErro('Erro ao salvar graduação!');
          this.isLoading = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.transferService.clear();
    this.router.navigate(['/graduacoes']);
  }

  onDelete(): void {
    if (this.isEditing && this.form.value.id) {
      if (confirm('Tem certeza que deseja excluir esta graduação?')) {
        this.isLoading = true;
        const graduacao = this.form.value as Graduacao;
        this.graduacaoService.delete(graduacao).subscribe({
          next: () => {
            console.log('Graduação excluída com sucesso');
            this.isLoading = false;
            this.router.navigate(['/graduacao']);
          },
          error: (error) => {
            console.error('Erro ao excluir graduação:', error);
            this.isLoading = false;
          }
        });
      }
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);
    if (control?.hasError('required')) {
      return 'Este campo é obrigatório';
    }
    if (control?.hasError('min')) {
      return 'Valor deve ser maior ou igual a 0';
    }
    if (control?.hasError('maxlength')) {
      return 'Valor excede o tamanho máximo permitido';
    }
    return '';
  }
}
