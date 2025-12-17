import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { MaterialFormModule } from '../../material/material-form.module';
import { FaixaKarateComponent } from '../../../project/graduacao/components/faixa-karate';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MaterialFormModule
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent {
  label=input.required<string>();
  max = input.required<number>();
  min = input.required<number>();
  step = input.required<number>();

  disabled = input<boolean>(false);
  showTicks = input<boolean>(true);
  thumbLabel = input<boolean>(true);

  value = output<number| null>();
  sliderValue: number | null = null;

  emitValue() {
    this.value.emit(this.sliderValue);
  }
}
