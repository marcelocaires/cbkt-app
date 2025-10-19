import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MaterialLayoutModule } from './../../../../shared/material/material-layout.module';

export interface MenuItem {
  label: string;
  icon: string;
  route?: string; // pais podem não ter rota própria
  children?: MenuItem[];
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MaterialLayoutModule,MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  menuItems = input.required<MenuItem[]>();
  itemSelected = output<MenuItem>();
  selectedItem: any = null;

  toggleSelection(item: any) {
    if (this.selectedItem === item) {
      this.selectedItem = null; // desmarca se já estiver selecionado
    } else {
      this.selectedItem = item;
    }
          console.log('Item selecionado:', item);
  }
}
