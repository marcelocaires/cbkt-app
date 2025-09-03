import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  exports: [MatButtonModule, MatIconModule, MatButtonToggleModule],
})
export class MaterialButtonModule {}