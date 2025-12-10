import { Component, input, output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialFormModule } from '../../material/material-form.module';

@Component({
  selector: 'app-datepicker',
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule,MaterialFormModule],
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss',
})
export class DatepickerComponent {
  label=input<string>("Selecione uma data");
  select=output<any>();
  date = new FormControl(new Date());

  ngOnInit() {
    this.select.emit(this.date.value)
  }

  selectDate(event: any) {
    this.select.emit(event.value);
  }
}
