import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaskDirective } from './directives/mask.directive';
import { DateMaskDirective } from './directives/date-mask.directive';

@NgModule({
  declarations: [],
  exports: [CommonModule, MaskDirective,DateMaskDirective],
  imports: [
    CommonModule,
    MaskDirective,
    DateMaskDirective
  ],
  providers: [DatePipe],
})
export class SharedModule { }
