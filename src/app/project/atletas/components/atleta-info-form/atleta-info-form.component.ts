import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialFormModule } from '../../../../shared/material/material-form.module';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { SharedModule } from '../../../../shared/shared.module';
import { Atleta } from '../../../atleta/models/atleta.model';

@Component({
  selector: 'app-atleta-info-form',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MaterialLayoutModule,
    MaterialButtonModule,
    MaterialFormModule
  ],
  templateUrl: './atleta-info-form.component.html',
  styleUrl: './atleta-info-form.component.scss',
})
export class AtletaInfoFormComponent extends BaseComponent {
  atleta = input<Atleta | null>(null);
  valor = output<any>();

  form: FormGroup = {} as FormGroup;

  constructor() {
    super();
    this.createForm();

    // Emitir o valor quando o formulário mudar
    this.form.valueChanges.subscribe(() => {
      this.emitirValor();
    });
  }

  ngOnInit() {
    this.populateForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      chkArbitro: [false],
      chkAvaliador: [false],
      ativo: [true]
    });
  }

  populateForm() {
    const atletaVal = this.atleta();
    if (atletaVal) {
      this.form.patchValue({
        chkArbitro: atletaVal.chkArbitro ?? false,
        chkAvaliador: atletaVal.chkAvaliador ?? false,
        ativo: atletaVal.ativo ?? true,
      });
    }
  }

  private emitirValor() {
    const formValue = this.form.value;
    this.valor.emit(formValue);
  }
}

