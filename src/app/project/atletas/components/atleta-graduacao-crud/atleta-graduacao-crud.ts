import { Component, input } from '@angular/core';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { SharedModule } from '../../../../shared/shared.module';
import { AtletaGraduacoesComponent } from '../../../atleta/components/atleta-graduacoes/atleta-graduacoes.component';
import { Atleta } from '../../../atleta/models/atleta.model';
import { AtletaGraduacaoCrudDlg } from '../atleta-graduacao-crud-dlg/atleta-graduacao-crud-dlg';

@Component({
  selector: 'app-atleta-graduacao-crud',
  standalone: true,
  imports: [
    SharedModule,
    MaterialLayoutModule,
    MaterialButtonModule,
    AtletaGraduacoesComponent
  ],
  templateUrl: './atleta-graduacao-crud.html',
  styleUrl: './atleta-graduacao-crud.scss',
})
export class AtletaGraduacaoCrudComponent extends BaseComponent{
  atleta=input.required<Atleta>();

  onCreate() {
    const dialog = this.matDialog.open(AtletaGraduacaoCrudDlg, {
      height: 'auto',
      width: '40%',
      disableClose: true
    });

    dialog.afterClosed().subscribe((result:any) => {
      if (result) {
      }
    });
  }
}
