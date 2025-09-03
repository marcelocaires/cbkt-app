import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  exports: [
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatTabsModule,
    MatStepperModule,
  ],
})
export class MaterialLayoutModule {}