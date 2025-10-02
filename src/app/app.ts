import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/layout/theme/theme.service';
import { MaterialLayoutModule } from './shared/material/material-layout.module';
import { MaterialButtonModule } from './shared/material/material-button.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MaterialLayoutModule,MaterialButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App {
  themeService=inject(ThemeService);
  protected readonly title = signal('cbkt-app');

  constructor() {
    this.themeService.setTheme();
  }

  changeTheme(): void {
    this.themeService.alternateTheme();
  }
}
