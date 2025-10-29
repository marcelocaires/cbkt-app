import { inject, Injectable } from '@angular/core';
import { StorageService } from '../../../storage/services/storage.service';

@Injectable({ providedIn: 'root' })
export class MenuService {
  storageService=inject(StorageService);

  saveMenuState(menuState: any) {
    this.storageService.sessionStorage.setItem('menuState',menuState);
  }

  getMenuState(): any {
    const state = this.storageService.sessionStorage.getItem('menuState');
    return state ? state : null;
  }
}
