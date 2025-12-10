import { Component } from '@angular/core';
import { BaseDialogComponent } from '../../../../shared/components/base/base-dialog.component';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialDialogModule } from '../../../../shared/material/material-dialog.module';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { SharedModule } from '../../../../shared/shared.module';
import { AtletaClubeForm } from '../atleta-clube-form/atleta-clube-form';

@Component({
  selector: 'app-atleta-clube-crud-dlg',
  standalone: true,
  imports: [
    SharedModule,
    MaterialButtonModule,
    MaterialLayoutModule,
    MaterialDialogModule,
    AtletaClubeForm
  ],
  templateUrl: './atleta-clube-crud-dlg.html',
  styleUrl: './atleta-clube-crud-dlg.scss',
})
export class AtletaClubeCrudDlg extends BaseDialogComponent<AtletaClubeCrudDlg>{
  isValid = false;
  formValue: any;
  titulo:string="Cadastrar Clube";
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
