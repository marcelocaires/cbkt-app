import { Component, input, output } from '@angular/core';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { PageTitleComponent } from '../../../../shared/components/page-title/page-title.component';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { SharedModule } from '../../../../shared/shared.module';
import { FaixaKarateComponent } from '../../../graduacao/components/faixa-karate';
import { AtletaGraduacao } from '../../models/atleta.model';

@Component({
  selector: 'app-atleta-graduacoes',
  templateUrl: './atleta-graduacoes.component.html',
  styleUrls: ['./atleta-graduacoes.component.scss'],
  standalone: true,
  imports: [
    SharedModule,
    MaterialLayoutModule,
    MaterialButtonModule,
    FaixaKarateComponent,
    PageTitleComponent
  ]
})
export class AtletaGraduacoesComponent extends BaseComponent{
  graduacoes = input.required<AtletaGraduacao[]>();
  isDelete = input<boolean>(false);
  onDelete = output<AtletaGraduacao>();

  constructor() {
    super();
  }

  deleteGraduacao(graduacao: AtletaGraduacao) {
    this.onDelete.emit(graduacao);
  }
}
