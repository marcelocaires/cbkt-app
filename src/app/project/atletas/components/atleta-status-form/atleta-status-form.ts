import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from '../../../../shared/components/base/base.component';

@Component({
  selector: 'app-atleta-status-form',
  imports: [],
  templateUrl: './atleta-status-form.html',
  styleUrl: './atleta-status-form.scss',
})
export class AtletaStatusForm extends BaseComponent{
  form: FormGroup={} as FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      nomeClube: [''],
      dataFaixa: [''],
      diaAnuidade: [null],
      mesAnuidade: [null],

      // Status e Observações
      ativo: [true],
      chkArbitro: [false],
      chkAvaliador: [false],
      chkArbitroCategoria: [false],
      pcd: [false],
      urlFoto: [''],
      observacao: ['']
    });
  }
}
