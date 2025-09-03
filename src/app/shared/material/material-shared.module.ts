import { NgModule } from '@angular/core';

import { MaterialFormModule } from './material-form.module';
import { MaterialButtonModule } from './material-button.module';
import { MaterialNavigationModule } from './material-navigation.module';
import { MaterialLayoutModule } from './material-layout.module';
import { MaterialTableModule } from './material-table.module';
import { MaterialDialogModule } from './material-dialog.module';
import { MaterialProgressModule } from './material-progress.module';

@NgModule({
  exports: [
    MaterialFormModule,
    MaterialButtonModule,
    MaterialNavigationModule,
    MaterialLayoutModule,
    MaterialTableModule,
    MaterialDialogModule,
    MaterialProgressModule,
  ],
})
export class MaterialSharedModule {}