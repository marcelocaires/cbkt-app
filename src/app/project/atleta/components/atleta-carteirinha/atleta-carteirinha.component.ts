import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FaixaKarateComponent } from '../../../graduacao/components/faixa-karate';
import { Atleta } from '../../models/atleta.model';

@Component({
  selector: 'app-atleta-carteirinha',
  standalone: true,
  imports: [CommonModule,FaixaKarateComponent],
  templateUrl: './atleta-carteirinha.component.html',
  styleUrls: ['./atleta-carteirinha.component.scss']
})
export class AtletaCarteirinhaComponent {
  atleta = input.required<Atleta>();
}
