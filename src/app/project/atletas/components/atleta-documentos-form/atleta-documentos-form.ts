import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { MaskDirective } from '../../../../shared/directives/mask.directive';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialFormModule } from '../../../../shared/material/material-form.module';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { SharedModule } from '../../../../shared/shared.module';
import { CpfValidator } from '../../../../shared/validators/cpf-validator';
import { Atleta } from '../../../atleta/models/atleta.model';

@Component({
  selector: 'app-atleta-documentos-form',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MaterialLayoutModule,
    MaterialButtonModule,
    MaterialFormModule,
    MaskDirective
  ],
  templateUrl: './atleta-documentos-form.html',
  styleUrl: './atleta-documentos-form.scss',
})
export class AtletaDocumentosForm extends BaseComponent{
  form: FormGroup={} as FormGroup;
  valor=output<any>();
  isHeader=input<boolean>(false);
  atleta=input<Atleta|null>(null);
  onInvalid=output<any>();
  msgInvalid:any=null;

  constructor(){
    super();
    this.createForm();
    this.form.valueChanges.subscribe(() => {
      if (this.form.valid) {
        this.valor.emit(this.form.value);
      }else if(this.form.pristine){
        if(this.msgInvalid===null){
          this.msgInvalid = "Documentação incompleta!";
          this.onInvalid.emit(this.msgInvalid);
        }
      }
    });
  }

  ngOnInit(): void {
    this.populateForm();
  }
  private createForm() {
    this.form = this.formBuilder.group({
      cpf: [null, [Validators.required, CpfValidator]],
      rg: [null],
      rgOrgao: [null],
      rgEstado: [null],
      certidaoNascimento: [null],
    });
  }
  private populateForm() {
    if(this.atleta()){
      this.form.get('cpf')?.patchValue(this.atleta()?.documentos?.cpf);
      this.form.get('rg')?.patchValue(this.atleta()?.documentos?.rg);
      this.form.get('rgOrgao')?.patchValue(this.atleta()?.documentos?.rgOrgao);
      this.form.get('rgEstado')?.patchValue(this.atleta()?.documentos?.rgEstado);
      this.form.get('certidaoNascimento')?.patchValue(this.atleta()?.documentos?.certidaoNascimento);
    }
  }
}
