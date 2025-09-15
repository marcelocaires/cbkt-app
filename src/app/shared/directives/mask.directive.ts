import { Directive, HostListener, input, output } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[mask]',
  standalone: true
})
export class MaskDirective implements ControlValueAccessor {

  mask=input.required<string>();
  return=output();

  constructor() { }

  writeValue(value: any): void {}

  onTouched: any;
  onChange: any;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('keyup', ['$event'])
  onKeyup($event: any) {
    var valor = $event.target.value.replace(/\D/g, '');
    var pad = this.mask().replace(/\D/g, '').replace(/9/g, '_');
    var valorMask = valor + pad.substring(0, pad.length - valor.length);

    // retorna caso pressionado backspace
    if ($event.keyCode === 8) {
      //this.onChange(valor);
      return;
    }

    if (valor.length <= pad.length) {
      //this.onChange(valor);
    }

    var valorMaskPos = 0;
    valor = '';
    for (var i = 0; i < this.mask().length; i++) {
      if (isNaN(parseInt(this.mask().charAt(i)))) {
        valor += this.mask().charAt(i);
      } else {
        valor += valorMask[valorMaskPos++];
      }
    }

    if (valor.indexOf('_') > -1) {
      valor = valor.substr(0, valor.indexOf('_'));
    }

    $event.target.value = valor;
    this.return.emit($event.target.value);
  }

  @HostListener('blur', ['$event'])
  onBlur($event: any) {
    // codigo
    if ($event.target.value.length === this.mask().length) {
      return;
    }
    //this.onChange('');
    $event.target.value = '';
    this.return.emit($event.target.value);
  }

}
