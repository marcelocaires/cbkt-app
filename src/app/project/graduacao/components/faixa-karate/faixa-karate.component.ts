import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

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
}
