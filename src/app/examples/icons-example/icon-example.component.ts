// src/app/icon-demo/icon-demo.component.ts
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-icon-example',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <h2>🎯 Material Symbols (Outlined)</h2>
    <mat-icon fontSet="material-symbols-outlined">home</mat-icon>
    <mat-icon fontSet="material-symbols-outlined">favorite</mat-icon>
    <mat-icon fontSet="material-symbols-outlined">settings</mat-icon>
    <mat-icon fontSet="material-symbols-outlined">id_card</mat-icon>
    <mat-icon fontSet="material-symbols-outlined">person</mat-icon>
    <mat-icon fontSet="material-symbols-outlined">star</mat-icon>
    <mat-icon fontSet="material-symbols-outlined">thumb_up</mat-icon>
    <mat-icon fontSet="material-symbols-outlined">search</mat-icon>
    <mat-icon fontSet="material-symbols-outlined">menu</mat-icon>
    <mat-icon fontSet="material-symbols-outlined">close</mat-icon>
    <mat-icon fontSet="material-symbols-outlined">check_circle</mat-icon>
    <mat-icon fontSet="material-symbols-outlined">done</mat-icon>
    <mat-icon fontSet="material-symbols-outlined">arrow_forward</mat-icon>
    <mat-icon fontSet="material-symbols-outlined">arrow_back</mat-icon>
    <mat-icon fontSet="material-symbols-outlined">arrow_upward</mat-icon>
    <mat-icon fontSet="material-symbols-outlined">arrow_downward</mat-icon>
    <mat-icon fontSet="material-symbols-outlined">cancel</mat-icon>

    <h2>💎 Material Icons Clássico (fallback)</h2>
    <mat-icon>home</mat-icon>
    <mat-icon>favorite</mat-icon>
    <mat-icon>settings</mat-icon>
    <mat-icon>id_card</mat-icon>
    <mat-icon>person</mat-icon>
    <mat-icon>star</mat-icon>
    <mat-icon>thumb_up</mat-icon>
    <mat-icon>search</mat-icon>
    <mat-icon>menu</mat-icon>
    <mat-icon>close</mat-icon>
    <mat-icon>check_circle</mat-icon>
    <mat-icon>done</mat-icon>
    <mat-icon>arrow_forward</mat-icon>
    <mat-icon>arrow_back</mat-icon>
    <mat-icon>arrow_upward</mat-icon>
    <mat-icon>arrow_downward</mat-icon>
    <mat-icon>cancel</mat-icon>
  `,
  styles: [`
    mat-icon {
      margin-right: 16px;
      vertical-align: middle;
    }
    h2 {
      margin-top: 24px;
      font-family: Arial, sans-serif;
    }
  `]
})
export class IconExampleComponent {}
