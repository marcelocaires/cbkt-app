import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialFormModule } from '../../../../shared/material/material-form.module';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { SharedModule } from '../../../../shared/shared.module';
import { Pessoa } from '../../../pessoas/services/pessoa.service';

@Component({
  selector: 'app-mandato-ocupacao-form',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MaterialLayoutModule,
    MaterialButtonModule,
    MaterialFormModule
  ],
  templateUrl: './mandato-ocupacao-form.html',
  styleUrl: './mandato-ocupacao-form.scss',
})
export class MandatoOcupacaoForm extends BaseComponent{
  pessoas=input.required<Pessoa[]>();
  isHeader=input<boolean>(false);
  isValid=output<boolean>();
  selectValue=output<any>();
  form: FormGroup={} as FormGroup;

  constructor() {
    super();
    this.form = this.formBuilder.group({
      pessoaId: [null,[Validators.required]],
      tipoOcupacao: ['TITULAR',[Validators.required]],
      tipoVinculo: ['ELEITO',[Validators.required]],
      dataInicio: [null,[Validators.required]],
      dataFim: [null],
      observacao: ['']
    });
    this.form.statusChanges.subscribe(status => {
      if (status === 'VALID'){
        this.selectValue.emit(this.form.value);
        this.isValid.emit(true);
      } else {
        this.isValid.emit(false);
      }
    });
  }
}
