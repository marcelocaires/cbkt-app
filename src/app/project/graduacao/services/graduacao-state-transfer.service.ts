import { Injectable } from '@angular/core';
import { DataTransferService } from '../../../shared/services/data-transfer.service';
import { Graduacao } from '../model/graduacao';

@Injectable({
  providedIn: 'root'
})
export class GraduacaoStateTransferService extends DataTransferService<Graduacao> {}
