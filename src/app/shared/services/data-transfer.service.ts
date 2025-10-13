import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { StorageService } from '../../core/storage/services/storage.service';

@Injectable(
  { providedIn: 'root' }
)
export class DataTransferService<T> {
  storageService=inject(StorageService);
  protected readonly _data: WritableSignal<T | null> = signal<T | null>(null);

  /** Sinal somente leitura, ideal para bindings reativos */
  readonly data = this._data.asReadonly();

  /** Define um novo valor */
  set(value: T): void {
    this._data.set(value);
    this.storageService.localStorage.setItem('dataTransfer',value);
  }

  /** Retorna o valor atual */
  get(): T | null {
    if(this._data()) {
      return this._data();
    }else if(this.storageService.localStorage.getItem('dataTransfer')) {
      return this.storageService.localStorage.getItem('dataTransfer');
    }
    return null;
  }

  /** Limpa o valor */
  clear(): void {
    this._data.set(null);
    this.storageService.localStorage.removeItem('dataTransfer');
  }
}
