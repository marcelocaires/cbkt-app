import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private localStorage:any;

  constructor(@Inject(DOCUMENT) document: Document) {
    this.localStorage= document.defaultView?.localStorage;
  }

  setItem(key: string, data:any): void {
    try {
      const serializedData = JSON.stringify(data);
      this.localStorage?.setItem(key, serializedData);
    } catch (error) {
      console.error(`Error storing data for key ${key}: ${error}`);
    }
  }

  getItem(key: string): any | null {
    const serializedData = this.localStorage?.getItem(key);
    if (serializedData) {
      try {
        return JSON.parse(serializedData);
      } catch (error) {
        console.error(`Error retrieving data for key ${key}: ${error}`);
        return null;
      }
    }
  }

  removeItem(key: string): void {
    this.localStorage?.removeItem(key);
  }

  clear(): boolean {
    if (this.localStorage) {
      this.localStorage?.clear();
      return true;
    }
    return false;
  }
}
