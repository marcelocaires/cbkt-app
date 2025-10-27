import { Component, inject } from "@angular/core";
import { MaterialButtonModule } from "../../../shared/material/material-button.module";
import { SharedModule } from "../../../shared/shared.module";
import { ThemeService } from "./theme.service";

@Component({
    selector: "app-theme-toggle",
    imports: [SharedModule,MaterialButtonModule],
    standalone: true,
    template: `
      <button
        type="button"
        mat-icon-button
        (click)="toggleTheme()">
        <mat-icon style="color: #fff;">
          {{!isDarkMode?"dark_mode":"light_mode"}}
        </mat-icon>
      </button>
  `
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);
  isDarkMode = false;

  ngOnInit() {
    this.isDarkMode = this.themeService.activeTheme === 'dark';
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.switchTheme(this.isDarkMode);
  }
}
