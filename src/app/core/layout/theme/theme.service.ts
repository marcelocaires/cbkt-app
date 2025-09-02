import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { StorageService } from '../../service/storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  storageService=inject(StorageService)

  private _document = inject(DOCUMENT);

  setTheme() {
    if(this.storageService.localStorage.getItem('theme')) {
      if(this.storageService.localStorage.getItem('theme') === 'dark') {
        this.switchTheme(true);
      }else{
        this.switchTheme(false);
      }
    }else{
      this.switchTheme(false);
    }
  }

  switchTheme(isDarkMode: boolean) {
    if(isDarkMode) {
      this.storageService.localStorage.setItem('theme', 'dark');
      this._document.body.classList.add('dark-theme');
      this._document.body.classList.add('dark-table');
      this._document.body.classList.remove('light-theme');
      this._document.body.classList.remove('light-table');
    } else {
      this.storageService.localStorage.setItem('theme', 'light');
      this._document.body.classList.add('light-theme');
      this._document.body.classList.add('light-table');
      this._document.body.classList.remove('dark-theme');
      this._document.body.classList.remove('dark-table');
    }
  }
}
