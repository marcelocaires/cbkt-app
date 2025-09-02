import { Component, inject } from '@angular/core';

import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../../core/service/storage.service';
import { MySnackBarService } from '../my-snackbar-component/my-snackbar.service';
import { SharedService } from './../../services/shared.service';

@Component({
  selector: 'app-base',
  standalone: false,
  template: `<p>base works!</p>`
})
export class BaseComponent{
  protected sharedService=inject(SharedService);
  protected datePipe=inject(DatePipe);
  protected formBuilder=inject(FormBuilder);
  protected msgService=inject(MySnackBarService);
  protected matDialog=inject(MatDialog);
  protected router=inject(Router);
  protected activatedRoute=inject(ActivatedRoute);
  protected storageService=inject(StorageService);
}
