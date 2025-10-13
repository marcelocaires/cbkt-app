import { Component, input, output } from '@angular/core';
import { MaterialButtonModule } from '../../material/material-button.module';
import { MaterialLayoutModule } from '../../material/material-layout.module';

@Component({
  standalone: true,
  imports: [
    MaterialLayoutModule,
    MaterialButtonModule
  ],
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent {
  title=input.required<string>();
  isCrud=input(false,{transform:(value:string|boolean)=>typeof value==="string"?value==="" || value==='true':value});
  isValid=input(false,{transform:(value:string|boolean)=>typeof value==="string"?value==="" || value==='true':value});
  cancel=output<boolean>();
  delete=output<boolean>();
  save=output<boolean>();

  onCancel():void{
    this.cancel.emit(true);
  }

  onDelete():void{
    this.delete.emit(true);
  }

  onSave():void{
    this.save.emit(true);
  }
}
