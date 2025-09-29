import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Atleta } from '../../models/atleta.model';

@Component({
  selector: 'app-atleta-carteirinha',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atleta-carteirinha.component.html',
  styleUrls: ['./atleta-carteirinha.component.scss']
})
export class AtletaCarteirinhaComponent {
  atleta = input.required<Atleta>();
}
