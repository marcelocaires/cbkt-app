import { Component, input } from '@angular/core';
import { AtletaGraduacoesComponent } from '../../../atleta/components/atleta-graduacoes/atleta-graduacoes.component';
import { Atleta } from '../../../atleta/models/atleta.model';

@Component({
  selector: 'app-atleta-graduacao-crud',
  standalone: true,
  imports: [AtletaGraduacoesComponent],
  templateUrl: './atleta-graduacao-crud.html',
  styleUrl: './atleta-graduacao-crud.scss',
})
export class AtletaGraduacaoCrudComponent {
  atleta=input.required<Atleta>();
}
