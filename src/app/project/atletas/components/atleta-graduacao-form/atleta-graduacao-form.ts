import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { DatepickerComponent } from '../../../../shared/components/datepicker/datepicker.component';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialFormModule } from '../../../../shared/material/material-form.module';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { SharedModule } from '../../../../shared/shared.module';
import { GraduacaoService } from '../../../graduacao/services/graduacao.service';
import { Graduacao } from '../../../graduacao/model/graduacao';
import { Observable } from 'rxjs';
import { FaixaKarateComponent } from '../../../graduacao/components/faixa-karate';
import { MatSelectChange } from '@angular/material/select';

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
    FaixaKarateComponent
  ],
  templateUrl: './atleta-graduacao-form.html',
  styleUrl: './atleta-graduacao-form.scss',
})
export class AtletaGraduacaoForm extends BaseComponent{
  isHeader=input<boolean>(false);
  isValid=output<boolean>();
  isTransferencia=input<boolean>(false);
  selectValue=output<any>();
  graduacaoService=inject(GraduacaoService);
  form: FormGroup={} as FormGroup;
  dtLabel:string="Data do Exame";
  graduacoes$= new Observable<Graduacao[]>();

  disabled = false;
  max = 7;
  min = 5;
  showTicks = true;
  step = 0.1;
  thumbLabel = true;
  value = 5;

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

  selecionarDataExame($event: any) {
    this.form.patchValue({dtExame: $event});
  }

  getContrastingColor(cor: string|null) {
    const color = cor?cor.replace('#', ''):'000000';
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? 'black' : 'white';
  }

  graduacaoSelect($event: MatSelectChange<any>) {
    console.log($event);
  }
}
