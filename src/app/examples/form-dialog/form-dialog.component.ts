import { Component } from '@angular/core';
import { MaterialButtonModule } from '../../shared/material/material-button.module';
import { MaterialLayoutModule } from '../../shared/material/material-layout.module';
import { SharedModule } from '../../shared/shared.module';
import { AddressFormComponent } from '../address-form/address-form.component';
import { MaterialDialogModule } from '../../shared/material/material-dialog.module';

@Component({
    selector: 'app-form-dialog',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss'],
    standalone: true,
    imports: [AddressFormComponent, SharedModule, MaterialButtonModule,MaterialLayoutModule,MaterialDialogModule]
})
export class FormDialogComponent {
}
