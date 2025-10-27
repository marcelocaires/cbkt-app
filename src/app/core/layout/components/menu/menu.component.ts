import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MaterialLayoutModule } from './../../../../shared/material/material-layout.module';

export interface MenuHeader {
  title: string;
  icon: string;
  iconType?: IconTypeEnum;
  itens: MenuItem[];
}

export interface MenuItem {
  label: string;
  route?: string;
  selected?: boolean;
}

export enum IconTypeEnum {
  SVG, OUTLINED, NORMAL
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
  selected = output<MenuItem>();
  selectedItem: any = null;
  iconType=IconTypeEnum;
  MENU: MenuHeader[] = [
    {
      title: 'Graduações',
      icon: 'faixa',
      iconType: IconTypeEnum.SVG,
      itens: [
        { label: 'Cadastro', route: '/graduacoes' }
      ],
    },
    {
      title: 'Atletas',
      icon: 'person',
      iconType: IconTypeEnum.NORMAL,
      itens: [
        { label: 'Cadastro', route: '/graduacoes' }
      ]
    },
    {
      title: 'Clubes',
      icon: 'home_work',
      iconType: IconTypeEnum.NORMAL,
      itens: [
        { label: 'Cadastro', route: '/graduacoes' }
      ],
    },
    {
      title: 'Federações',
      icon: 'apartment',
      iconType: IconTypeEnum.NORMAL,
      itens: [
        { label: 'Cadastro', route: '/graduacoes' }
      ],
    }
  ];

  toggleSelection(item: any) {
    if (this.selectedItem === item) {
      this.selectedItem = null; // desmarca se já estiver selecionado
    } else {
      this.selectedItem = item;
    }
     console.log('Item selecionado:', item);
  }

  itemSelected(item: MenuItem) {
    this.MENU.forEach(header => {
      header.itens.forEach(i => i.selected = false);
    });
    item.selected = true;
    this.selected.emit(item);
  }
}
