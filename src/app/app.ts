import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconSvgRegisterService } from './core/layout/services/icon-svg-register.service';
import { ThemeService } from './core/layout/theme/theme.service';
import { MaterialButtonModule } from './shared/material/material-button.module';
import { MaterialLayoutModule } from './shared/material/material-layout.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MaterialLayoutModule,MaterialButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App {
  protected readonly title = signal('cbkt-app');
  themeService=inject(ThemeService);
  iconSvgRegister=inject(IconSvgRegisterService);

  constructor() {
    this.themeService.setTheme();
    this.iconSvgRegister.register();
  }
}
