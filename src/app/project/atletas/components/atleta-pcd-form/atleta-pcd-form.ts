import { Component, input, output } from '@angular/core';
import { AtletaLaudoMedicoComponent } from '../../../atleta/components/atleta-laudo-medico/atleta-laudo-medico.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialFormModule } from '../../../../shared/material/material-form.module';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { Atleta } from '../../../atleta/models/atleta.model';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-atleta-pcd-form',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MaterialLayoutModule,
    MaterialButtonModule,
    MaterialFormModule,
    AtletaLaudoMedicoComponent],
  templateUrl: './atleta-pcd-form.html',
  styleUrl: './atleta-pcd-form.scss',
})
export class AtletaPcdFormComponent extends BaseComponent {

  atleta = input.required<Atleta>();
  update= output<any>();
  form: FormGroup = {} as FormGroup;

  constructor() {
    super();
    this.createForm();
    this.form.valueChanges.subscribe(() => {
      this.updateValue();
    });
  }

  ngOnInit() {
    this.initForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      isPcd: [false, Validators.required],
      deficienciaTipo: [null, Validators.required],
      deficienciaDescricao: [null, Validators.required],
      deficienciaCID: [null, Validators.required],
      urlLaudoMedico: [null, Validators.required]
    });
  }

  initForm() {
    const atleta = this.atleta();
    if(atleta.isPcd !== undefined && atleta.isPcd !== null) {
      this.form.patchValue({
        isPcd: atleta.isPcd,
        deficienciaTipo: atleta.deficienciaTipo,
        deficienciaDescricao: atleta.deficienciaDescricao,
        deficienciaCID: atleta.deficienciaCID,
        urlLaudoMedico: atleta.urlLaudoMedico
      });
    }
  }

  private updateValue() {
    if(this.form.dirty) {
      if(this.isPcd && this.form.invalid ) {
        return;
      }
      const formValue = this.form.value;
      this.update.emit(formValue);
    }
  }

  updateLaudo($event: string|null) {
    this.form.get('urlLaudoMedico')?.setValue($event);
    this.updateValue();
  }

  get isPcd() {
    return this.form.get('isPcd')?.value;
  }
}
