import { Component } from '@angular/core';
import { BaseDialogComponent } from '../../../../shared/components/base/base-dialog.component';
import { SharedModule } from '../../../../shared/shared.module';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { MaterialDialogModule } from '../../../../shared/material/material-dialog.module';
import { AtletaGraduacaoForm } from '../atleta-graduacao-form/atleta-graduacao-form';

@Component({
  selector: 'app-atleta-graduacao-crud-dlg',
  standalone: true,
  imports: [
    SharedModule,
    MaterialButtonModule,
    MaterialLayoutModule,
    MaterialDialogModule,
    AtletaGraduacaoForm
  ],
  templateUrl: './atleta-graduacao-crud-dlg.html',
  styleUrl: './atleta-graduacao-crud-dlg.scss',
})
export class AtletaGraduacaoCrudDlg extends BaseDialogComponent<AtletaGraduacaoCrudDlg>{
  isValid = false;
  formValue: any;
  titulo:string="Cadastrar Graduação";
  action:string="Cadastrar";
  iconAction:string="add_circle";
  isTransferencia=false;

  constructor() {
    super();
    if(this.data && this.data.transferencia){
      this.titulo = "Transferir Atleta de Clube";
      this.action = "Transferir";
      this.iconAction = "swap_horizontal_circle";
      this.isTransferencia = true;
    }
  }

  onIsValidChange(valid: boolean) {
    this.isValid = valid;
  }
  onSelectValueChange($event: any) {
    this.formValue = $event;
  }
  confirmDialog(){
    this.dialogRef.close(this.formValue);
  }

  get isValidForm(): boolean {
    return this.formValue !== undefined && this.formValue !== null;
  }
}
