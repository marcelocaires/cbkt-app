import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { TelefoneMaskDirective } from '../../../../shared/directives/telefone-mask.directive';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialFormModule } from '../../../../shared/material/material-form.module';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { SharedModule } from '../../../../shared/shared.module';
import { Atleta } from '../../../atleta/models/atleta.model';

@Component({
  selector: 'app-atleta-contato-form',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MaterialLayoutModule,
    MaterialButtonModule,
    MaterialFormModule,
    TelefoneMaskDirective
  ],
  templateUrl: './atleta-contato-form.html',
  styleUrl: './atleta-contato-form.scss',
})
export class AtletaContatoForm extends BaseComponent{
  atleta=input<Atleta|null>(null);
  valor=output<any>();
  isHeader=input<boolean>(false);
  form: FormGroup={} as FormGroup;
  onInvalid=output<any>();
  msgInvalid:any=null;
  constructor(){
    super();
    this.createForm();

    // Emitir o valor quando o formulário for válido
    this.form.valueChanges.subscribe(() => {
      if(this.form.valid) {
        this.valor.emit(this.form.value);
      }else if(this.form.pristine){
        if(this.msgInvalid==null){
          this.msgInvalid = "Dados de contato incompletos!";
          this.onInvalid.emit(this.msgInvalid);
        }
      }
    });
  }

  ngOnInit() {
    this.populateForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.email,Validators.required]],
      telefone: [null],
    });
  }
  populateForm() {
    if(this.atleta()){
      this.form.get('email')?.setValue(this.atleta()!.contato?.email);
      this.form.get('telefone')?.setValue(this.atleta()!.contato?.telefone);
    }
  }
}
