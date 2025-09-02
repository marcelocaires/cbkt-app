import { Component, inject } from "@angular/core";
import { SharedModule } from "../../../shared/shared.module";
import { ThemeService } from "./theme.service";

@Component({
    selector: "app-theme-toggle",
    imports: [SharedModule],
    standalone: true,
    template: `
      <button
        type="button"
        mat-icon-button
        (click)="toggleTheme()"
        [matTooltip]="isDarkMode?'Alternar para o tema claro':'Alternar para o tema escuro'">
        <mat-icon>
          {{!isDarkMode?"dark_mode":"light_mode"}}
        </mat-icon>
      </button>
  `
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);
  isDarkMode = false;

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.switchTheme(this.isDarkMode);
  }
}
