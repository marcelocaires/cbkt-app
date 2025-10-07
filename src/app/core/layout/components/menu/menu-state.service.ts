import { Injectable, WritableSignal, signal, effect } from '@angular/core';

/**
 * Serviço responsável por manter (e persistir) o estado de expansão dos itens de menu.
 * Usa localStorage para lembrar o estado entre recarregamentos.
 */
@Injectable({ providedIn: 'root' })
export class MenuStateService {
  private readonly storageKey = 'cbkt.menu.expanded.v1';
  private readonly expandedSet: WritableSignal<Set<string>> = signal(new Set<string>());

  constructor() {
    this.load();
    // Persiste automaticamente sempre que o conjunto muda
    effect(() => {
      const arr = Array.from(this.expandedSet().values());
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(arr));
      } catch {
        // Silencia erros de quota/privacidade
      }
    });
  }

  private load() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          this.expandedSet.set(new Set(parsed.filter(k => typeof k === 'string')));
        }
      }
    } catch {
      // Ignora falhas de parse
    }
  }

  isExpanded(key: string): boolean {
    return this.expandedSet().has(key);
  }

  toggle(key: string) {
    const copy = new Set(this.expandedSet());
    if (copy.has(key)) copy.delete(key); else copy.add(key);
    this.expandedSet.set(copy);
  }

  expand(key: string) {
    if (!this.isExpanded(key)) this.toggle(key);
  }

  collapse(key: string) {
    if (this.isExpanded(key)) this.toggle(key);
  }
}
