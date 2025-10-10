import { Component, inject, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { MaterialFormModule } from '../../../../shared/material/material-form.module';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { MaterialProgressModule } from '../../../../shared/material/material-progress.module';
import { SharedModule } from '../../../../shared/shared.module';
import { Graduacao } from '../../model/graduacao';
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
    SharedModule
  ]
})
export class GraduacaoCrudComponent extends BaseComponent{
  graduacao = input<Graduacao | null>(null);
  graduacaoService=inject(GraduacaoService);

  form: FormGroup;
  isEditing = false;
  isLoading = false;

  constructor() {
    super();
    this.form = this.createForm();
  }

  ngOnInit(): void {
    const graduacaoValue = this.graduacao();
    if (graduacaoValue) {
      this.isEditing = true;
      this.populateForm(graduacaoValue);
    }
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      descricaoGraduacao: ['', [Validators.required, Validators.maxLength(100)]],
      grau: [''],
      corNome: [''],
      corCodigo: [''],
      carencia: [0, [Validators.required, Validators.min(0)]],
      carenciaMenor: [0, [Validators.required, Validators.min(0)]],
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
      corNome: graduacao.corNome,
      corCodigo: graduacao.corCodigo,
      carencia: graduacao.carencia,
      carenciaMenor: graduacao.carenciaMenor,
      valor: graduacao.valor,
      idadeMinima: graduacao.idadeMinima,
      anuidadeAte: graduacao.anuidadeAte,
      anuidadeApos: graduacao.anuidadeApos,
      anuidade: graduacao.anuidade
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading = true;
      const formData = this.form.value;

      const operation = this.isEditing
        ? this.graduacaoService.update(formData)
        : this.graduacaoService.create(this.form);

      operation.subscribe({
        next: (response) => {
          console.log('Graduação salva com sucesso:', response);
          this.isLoading = false;
          this.router.navigate(['/graduacao']);
        },
        error: (error) => {
          console.error('Erro ao salvar graduação:', error);
          this.isLoading = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/graduacao']);
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
