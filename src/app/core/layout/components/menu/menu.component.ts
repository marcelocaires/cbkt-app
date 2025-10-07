import { MaterialLayoutModule } from './../../../../shared/material/material-layout.module';
import { Component, input, output, signal, computed, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { MenuStateService } from './menu-state.service';

export interface MenuItem {
  label: string;
  icon: string;
  route?: string; // pais podem não ter rota própria
  children?: MenuItem[];
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MaterialLayoutModule,MatListModule, MatIconModule, MatButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  // Entrada principal de itens (arvore)
  menuItems = input.required<MenuItem[]>();
  // Modo acordeão: apenas um submenu aberto por nível
  accordion = input(false);
  // Define níveis (depth) nos quais o comportamento exclusivo (acordeão) aplica. Se definido, sobrepõe accordion.
  accordionLevels = input<number[] | null>(null);
  // Expande cadeia de pais da rota ativa automaticamente
  autoExpandActive = input(true);

  // Outputs
  itemSelected = output<MenuItem>();
  expandedChange = output<{ item: MenuItem; expanded: boolean }>();

  // Cache plano para facilitar track / acessibilidade
  flatKeys = computed(() => this.flattenKeys(this.menuItems()));

  private parentMap = signal(new Map<string, string | undefined>());

    constructor(private menuState: MenuStateService, private router: Router) {
    // Reconstrói parentMap quando itens mudarem
    effect(() => {
      const items = this.menuItems();
      const map = new Map<string, string | undefined>();
      this.buildParentMap(items, undefined, map);
      this.parentMap.set(map);
      // Ao trocar menu, re-expande rota ativa se aplicável
      if (this.autoExpandActive()) {
        this.expandActiveByUrl(this.router.url);
      }
    });

    // Escuta navegação para abrir cadeia
    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd && this.autoExpandActive()) {
        this.expandActiveByUrl(ev.urlAfterRedirects);
      }
    });
  }

  onItemClick(item: MenuItem) {
    const key = this.keyFor(item);
    if (item.children?.length) {
      const already = this.isExpanded(item);
      const levelInfo = this.findSiblingsAndDepth(this.menuItems(), key, 0);
      const depth = levelInfo?.depth ?? 0;
      const levels = this.accordionLevels();
      const exclusive = levels ? levels.includes(depth) : this.accordion();
      if (!already && exclusive && levelInfo) {
        for (const sib of levelInfo.siblings) {
          const sibKey = this.keyFor(sib);
          if (sibKey !== key && this.menuState.isExpanded(sibKey)) {
            this.menuState.collapse(sibKey);
            this.expandedChange.emit({ item: sib, expanded: false });
          }
        }
      }
      this.menuState.toggle(key);
      this.expandedChange.emit({ item, expanded: !already });
    } else if (item.route) {
      this.itemSelected.emit(item);
    }
  }

  onKeydown(ev: KeyboardEvent, item: MenuItem) {
    const key = ev.key;
    if (key === 'Enter' || key === ' ') {
      ev.preventDefault();
      this.onItemClick(item);
      return;
    }
    if (key === 'ArrowRight' && item.children?.length && !this.isExpanded(item)) {
      ev.preventDefault();
      this.menuState.expand(this.keyFor(item));
    }
    if (key === 'ArrowLeft' && item.children?.length && this.isExpanded(item)) {
      ev.preventDefault();
      this.menuState.collapse(this.keyFor(item));
    }
  }

  isExpanded(item: MenuItem): boolean {
    return this.menuState.isExpanded(this.keyFor(item));
  }

  keyFor(item: MenuItem): string {
    return item.route || `label:${item.label}`; // fallback estável
  }

  private flattenKeys(items: MenuItem[], acc: string[] = []): string[] {
    for (const it of items) {
      acc.push(this.keyFor(it));
      if (it.children?.length) this.flattenKeys(it.children, acc);
    }
    return acc;
  }

  private findSiblingsAndDepth(list: MenuItem[], targetKey: string, depth: number): { siblings: MenuItem[]; depth: number } | null {
    for (const it of list) {
      const key = this.keyFor(it);
      if (key === targetKey) {
        return { siblings: list, depth };
      }
      if (it.children?.length) {
        const inside = this.findSiblingsAndDepth(it.children, targetKey, depth + 1);
        if (inside) return inside;
      }
    }
    return null;
  }

  private buildParentMap(items: MenuItem[], parentKey: string | undefined, map: Map<string, string | undefined>) {
    for (const it of items) {
      const k = this.keyFor(it);
      map.set(k, parentKey);
      if (it.children?.length) this.buildParentMap(it.children, k, map);
    }
  }

  private expandActiveByUrl(url: string) {
    // Normaliza retirando query/hash
    const path = url.split(/[?#]/)[0];
    const found = this.findByRoute(this.menuItems(), path);
    if (!found) return;
    // Sobe cadeia de pais expandindo
    let currentKey = this.keyFor(found);
    const parentMap = this.parentMap();
    const visited = new Set<string>();
    while (currentKey && !visited.has(currentKey)) {
      visited.add(currentKey);
      const parentKey = parentMap.get(currentKey);
      if (parentKey) {
        // Expande pai
        if (!this.menuState.isExpanded(parentKey)) {
          this.menuState.expand(parentKey);
        }
        currentKey = parentKey;
      } else {
        break;
      }
    }
  }

  private findByRoute(items: MenuItem[], route: string): MenuItem | null {
    for (const it of items) {
      if (it.route === route) return it;
      if (it.children?.length) {
        const inside = this.findByRoute(it.children, route);
        if (inside) return inside;
      }
    }
    return null;
  }
}
