import { Component } from '@angular/core';
import { BaseDialogComponent } from '../../../../shared/components/base/base-dialog.component';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialDialogModule } from '../../../../shared/material/material-dialog.module';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { SharedModule } from '../../../../shared/shared.module';
import { MandatoOcupacaoForm } from '../mandato-ocupacao-form/mandato-ocupacao-form';

@Component({
  selector: 'app-mandato-ocupacao-crud-dlg',
  standalone: true,
  imports: [
    SharedModule,
    MaterialButtonModule,
    MaterialLayoutModule,
    MaterialDialogModule,
    MandatoOcupacaoForm
  ],
  templateUrl: './mandato-ocupacao-crud-dlg.html',
  styleUrls: ['./mandato-ocupacao-crud-dlg.scss'],
})
export class MandatoOcupacaoCrudDlg extends BaseDialogComponent<MandatoOcupacaoCrudDlg>{
  isValid = false;
  formValue: any;
  titulo:string="Adicionar Ocupação";
  action:string="Adicionar";
  iconAction:string="add_circle";

  constructor() {
    super();
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
