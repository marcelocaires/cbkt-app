import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Observable } from 'rxjs';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { DatepickerComponent } from '../../../../shared/components/datepicker/datepicker.component';
import { SliderComponent } from '../../../../shared/components/slider/slider.component';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialFormModule } from '../../../../shared/material/material-form.module';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { SharedModule } from '../../../../shared/shared.module';
import { Graduacao } from '../../../graduacao/model/graduacao';
import { GraduacaoService } from '../../../graduacao/services/graduacao.service';

@Component({
  selector: 'app-atleta-graduacao-form',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MaterialLayoutModule,
    MaterialButtonModule,
    MaterialFormModule,
    DatepickerComponent,
    SliderComponent
  ],
  templateUrl: './atleta-graduacao-form.html',
  styleUrl: './atleta-graduacao-form.scss',
})
export class AtletaGraduacaoForm extends BaseComponent{
  isHeader=input<boolean>(false);
  isValid=output<boolean>();
  isTransferencia=input<boolean>(false);
  value=output<any>();
  graduacaoService=inject(GraduacaoService);
  form: FormGroup={} as FormGroup;
  dtLabel:string="Data do Exame";
  graduacoes$= new Observable<Graduacao[]>();

  constructor() {
    super();
    this.form = this.formBuilder.group({
      graduacao: [null,[Validators.required]],
      dtExame: [null,[Validators.required]],
      nota: [null,[Validators.required, Validators.min(5), Validators.max(7)]]
    });
  }

  ngOnInit(): void {
    this.graduacoes$= this.graduacaoService.read();
  }

  getContrastingColor(cor: string|null) {
    const color = cor?cor.replace('#', ''):'000000';
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? 'black' : 'white';
  }

  selecionarDataExame($event: any) {
    this.form.patchValue({dtExame: $event});
    this.emitForm();
  }

  graduacaoSelect($event: MatSelectChange<any>) {
    this.form.patchValue({graduacao: $event.value});
    this.emitForm();
  }

  valorNota(value: any) {
    this.form.patchValue({nota: value});
    this.emitForm();
  }

  private emitForm() {
    if(this.form.invalid) {
      this.isValid.emit(false);
      return;
    }
    this.isValid.emit(this.form.valid);
    this.value.emit(this.form.value);
  }
}
