import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const MATERIAL_ANGULAR=[
  CommonModule,
]

@NgModule({
  declarations: [],
  exports: [MATERIAL_ANGULAR,FormsModule,ReactiveFormsModule],
  imports: [
    CommonModule,
    MATERIAL_ANGULAR,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
})
export class SharedModule { }
