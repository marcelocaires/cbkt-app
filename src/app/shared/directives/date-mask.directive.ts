import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[dateMask]'
})
export class DateMaskDirective {

  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    let value = event.target.value.replace(/\D/g, '');

    if (value.length > 8) {
      value = value.substring(0, 8);
    }

    // coloca as barras
    if (value.length > 4) {
      value = value.replace(/(\d{2})(\d{2})(\d+)/, '$1/$2/$3');
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d+)/, '$1/$2');
    }

    this.ngControl.control?.setValue(value, { emitEvent: false });
  }

  @HostListener('blur')
  onBlur() {
    const value = this.ngControl.control?.value;
    if (!value) return;

    const parts = value.split('/');
    if (parts.length !== 3) return;

    const [d, m, y] = parts.map(Number);
    const isValid =
      d >= 1 && d <= 31 &&
      m >= 1 && m <= 12 &&
      y >= 1000;

    if (!isValid) {
      this.ngControl.control?.setValue('', { emitEvent: false });
    }
  }
}
