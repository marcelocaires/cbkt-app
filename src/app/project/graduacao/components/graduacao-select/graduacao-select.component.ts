import { Component, OnInit, output, signal } from '@angular/core';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialFormModule } from '../../../../shared/material/material-form.module';
import { SharedModule } from '../../../../shared/shared.module';
import { Graduacao } from '../../model/graduacao';
import { GraduacaoService } from '../../services/graduacao.service';
import { FaixaKarateComponent } from '../faixa-karate/faixa-karate.component';

@Component({
  selector: 'app-graduacao-select',
  standalone: true,
  imports: [SharedModule, MaterialFormModule, FaixaKarateComponent, MaterialButtonModule],
  templateUrl: './graduacao-select.component.html',
  styleUrls: ['./graduacao-select.component.scss']
})
export class GraduacaoSelectComponent implements OnInit {
  graduacoes = signal<Graduacao[]>([]);
  loading = signal(true);
  graduacaoSelecionada = output<Graduacao>();
  selectedGraduacao = signal<Graduacao | null>(null);

  constructor(private graduacaoService: GraduacaoService) {}

  ngOnInit(): void {
    this.carregarGraduacoes();
  }

  carregarGraduacoes(): void {
    this.loading.set(true);
    this.graduacaoService.read().subscribe({
      next: (graduacoes: Graduacao[]) => {
        this.graduacoes.set(graduacoes);
        this.loading.set(false);
      },
      error: (error: any) => {
        console.error('Erro ao carregar graduações:', error);
        this.loading.set(false);
      }
    });
  }

  onGraduacaoChange(graduacaoId: number): void {
    const graduacao = this.graduacoes().find(g => g.id === graduacaoId);
    if (graduacao) {
      this.selectedGraduacao.set(graduacao);
      this.graduacaoSelecionada.emit(graduacao);
    }
  }

  getContrastingColor(hexColor: string | null): string {
    if (!hexColor) return '#000000';

    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 128 ? '#000000' : '#FFFFFF';
  }
}
