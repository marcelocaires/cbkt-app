import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
}
