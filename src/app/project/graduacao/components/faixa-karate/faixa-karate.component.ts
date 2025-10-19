import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-faixa-karate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faixa-karate.component.html',
  styleUrls: ['./faixa-karate.component.scss']
})
export class FaixaKarateComponent {
  corHex=input<string|null>('#FFFFFF');
  nomeCor=input<string|null>(null);
  grau=input<string|null>(null);
  borderRadius=input<string|null>('8px');
}
