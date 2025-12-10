import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialFormModule } from '../../../../shared/material/material-form.module';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { SharedModule } from '../../../../shared/shared.module';
import { Clube } from '../../../atleta/models/atleta.model';
import { ClubeFilterComponent } from '../../../clubes/components/clube-filter/clube-filter.component';
import { DatepickerComponent } from '../../../../shared/components/datepicker/datepicker.component';

@Component({
  selector: 'app-atleta-clube-form',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MaterialLayoutModule,
    MaterialButtonModule,
    MaterialFormModule,
    ClubeFilterComponent,
    DatepickerComponent
  ],
  templateUrl: './atleta-clube-form.html',
  styleUrl: './atleta-clube-form.scss',
})
export class AtletaClubeForm extends BaseComponent{
  isHeader=input<boolean>(false);
  isValid=output<boolean>();
  isTransferencia=input<boolean>(false);
  selectValue=output<any>();
  form: FormGroup={} as FormGroup;
  dtLabel:string="Data de Admissão";

  constructor() {
    super();
    this.form = this.formBuilder.group({
      clube: [null,[Validators.required]],
      dtAdmissao: [null,[Validators.required]]
    });
    this.form.statusChanges.subscribe(status => {
      console.log("Status do formulário:", status);
      if (status === 'VALID'){
        console.log("Formulário válido com valor:", this.form.value);
        this.selectValue.emit(this.form.value);
      } else {
        this.isValid.emit(false);
      }
    });
  }

  ngOnInit(){
    if(this.isTransferencia()){
      this.dtLabel = "Data de Transferência";
    }
  }

  selecionarClube($event: Clube|null) {
    if ($event) {
      this.form.patchValue({ clube: $event });
    }
  }
  selecionarDataAdmissao($event: Date) {
    if ($event) {
      this.form.patchValue({ dtAdmissao: $event });
    }
  }
}
