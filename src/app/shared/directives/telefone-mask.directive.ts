import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[telefoneMask]'
})
export class TelefoneMaskDirective {

  private lastValue = '';

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    let value: string = this.el.nativeElement.value;

    // Remove tudo que não for número
    value = value.replace(/\D/g, '');

    // Evita loop infinito
    if (value === this.lastValue) return;

    let masked = value;

    // (XX) XXXX-XXXX  -> para 10 dígitos
    if (value.length <= 10) {
      masked = value
        .replace(/^(\d{0,2})/, '($1')
        .replace(/^\((\d{2})(\d{0,4})/, '($1) $2')
        .replace(/(\d{4})(\d{0,4})$/, '$1-$2');
    }

    // (XX) XXXXX-XXXX -> para 11 dígitos
    if (value.length > 10) {
      masked = value
        .replace(/^(\d{0,2})/, '($1')
        .replace(/^\((\d{2})(\d{0,5})/, '($1) $2')
        .replace(/(\d{5})(\d{0,4})$/, '$1-$2');
    }

    this.lastValue = value;
    this.el.nativeElement.value = masked;
  }
}
