import { Component, inject, signal } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
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
  iconRegistry=inject(MatIconRegistry);
  sanitizer=inject(DomSanitizer);
  constructor() {
    this.themeService.setTheme();
    this.iconRegistry.addSvgIconSetInNamespace(
      'carteirinha',
      this.sanitizer.bypassSecurityTrustResourceUrl('../../public/assets/icons/carteirinha.svg')
    );
  }
}
