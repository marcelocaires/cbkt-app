import { Component, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from "@angular/router";
import { MaterialLayoutModule } from './../../../../shared/material/material-layout.module';
import { MenuService } from './menu.service';

export interface Menu {
  id: string;
  headers: MenuHeader[];
}

export interface MenuHeader {
  id:string
  title: string;
  icon: string;
  iconType: IconTypeEnum;
  itens: MenuItem[];
}

export interface MenuItem {
  id:number,
  label: string;
  route: string;
  selected?: boolean;
}

export enum IconTypeEnum {
  SVG, OUTLINED, NORMAL
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MaterialLayoutModule, MatListModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  menuService=inject(MenuService);
  menuItems = input.required<MenuItem[]>();
  selected = output<MenuItem>();
  selectedItem: any = null;
  iconType=IconTypeEnum;

  menuHeaders: MenuHeader[] = [
    {
      id: 'graduacoes',
      title: 'Graduações',
      icon: 'faixa',
      iconType: IconTypeEnum.SVG,
      itens: [
        { id: 1, label: 'Cadastro', route: '/graduacoes' },
        { id: 2, label: 'Cadastro', route: '/graduacoes' },
        { id: 3, label: 'Cadastro', route: '/graduacoes' }
      ],
    },
    {
      id: 'atletas',
      title: 'Atletas',
      icon: 'person',
      iconType: IconTypeEnum.NORMAL,
      itens: [
        { id: 2, label: 'Cadastro', route: '/atletas' }
      ]
    },
    {
      id: 'clubes',
      title: 'Clubes',
      icon: 'home_work',
      iconType: IconTypeEnum.NORMAL,
      itens: [
        { id: 3, label: 'Cadastro', route: '/clubes' }
      ],
    },
    {
      id: 'federacoes',
      title: 'Federações',
      icon: 'apartment',
      iconType: IconTypeEnum.NORMAL,
      itens: [
        { id: 4, label: 'Cadastro', route: '/federacoes' }
      ],
    }
  ]
  menu: Menu ={
    id: 'cadastro',
    headers: this.menuHeaders
  };

  ngOnInit() {
    const savedMenu: Menu = this.menuService.getMenuState();
    if (savedMenu && savedMenu.id === this.menu.id) {
      this.menu = savedMenu;
    }
  }

  itemSelected(item: MenuItem) {
    this.menu.headers.forEach(header => {
      header.itens.forEach(i => i.selected = false);
    });
    item.selected = true;
    this.menuService.saveMenuState(this.menu);
    console.log('Item selecionado:', item);
    this.selected.emit(item);
  }

  isExpanded(header: MenuHeader): boolean {
    return header.itens.some(item => item.selected);
  }
}
