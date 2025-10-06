import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

export interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  menuItems = input.required<MenuItem[]>();
}
