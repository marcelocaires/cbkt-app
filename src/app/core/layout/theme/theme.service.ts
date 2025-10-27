import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { StorageService } from '../../storage/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  storageService=inject(StorageService)

  private _document = inject(DOCUMENT);

  get activeTheme(): 'light' | 'dark' {
    return this.storageService.localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  }

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

  alternateTheme() {
    if(this.activeTheme === 'dark') {
      this.switchTheme(false);
    } else {
      this.switchTheme(true);
    }
  }

  switchTheme(isDarkMode: boolean) {
    this._document.body.classList.add('cyan-theme');
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
