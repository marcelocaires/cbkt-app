import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  private sessionStorage:any;

  constructor(@Inject(DOCUMENT) document: Document) {
    this.sessionStorage= document.defaultView?.sessionStorage;
  }

  setItem(key: string, data:any): void {
    try {
      const serializedData = JSON.stringify(data);
      this.sessionStorage?.setItem(key, serializedData);
    } catch (error) {
      console.error(`Error storing data for key ${key}: ${error}`);
    }
  }

  getItem(key: string): any | null {
    const serializedData = this.sessionStorage?.getItem(key);
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
    this.sessionStorage?.removeItem(key);
  }

  clear(): boolean {
    if (this.sessionStorage) {
      this.sessionStorage?.clear();
      return true;
    }
    return false;
  }
}
