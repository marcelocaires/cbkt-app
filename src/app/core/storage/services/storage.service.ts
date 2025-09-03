import { Injectable, inject } from '@angular/core';

import { LocalStorageService } from './local-storage.service';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  localStorage=inject(LocalStorageService);
  sessionStorage=inject(SessionStorageService);
}
