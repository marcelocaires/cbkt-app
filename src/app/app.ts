import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/layout/theme/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true
})
export class App {
  themeService=inject(ThemeService);
  protected readonly title = signal('cbkt-app');

  constructor() {
    this.themeService.setTheme();
  }
}
