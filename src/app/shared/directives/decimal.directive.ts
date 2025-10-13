import { Directive, ElementRef, HostListener, input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[decimalFormat]',
  standalone: true
})
export class DecimalDirective implements OnInit {
  decimals = input<number>(2);
  private rawValue: string = '';

  constructor(
    private el: ElementRef,
    private control: NgControl
  ) {}

  ngOnInit() {
    if(!this.el.nativeElement.value) {
      this.el.nativeElement.value = this.formatarDecimalBr(null);
    }else{
      this.rawValue = this.el.nativeElement.value;
      this.el.nativeElement.value = this.formatarDecimalBr(this.rawValue);
    }
  }

  @HostListener('focus')
  onFocus(): void {
    setTimeout(() => {
      const input = this.el.nativeElement;
      if(input.value==null || input.value==='R$ 0,00' || input.value==='0,00'){
        input.value = '';
      }
      const length = input.value.length;
      input.setSelectionRange(0, length);
    }, 0);
  }

  @HostListener('blur')
  onBlur(): void {
    // Garantir que campo sempre tenha a máscara, mesmo quando vazio
    if (!this.el.nativeElement.value || this.el.nativeElement.value === '') {
      this.rawValue= this.formatarDecimalBr(null);
      this.el.nativeElement.value=this.rawValue;
    }else{
      this.rawValue = this.el.nativeElement.value;
      this.el.nativeElement.value = this.formatarDecimalBr(this.rawValue);
    }
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    // Permitir teclas de controle
    const controlKeys = [
      'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      'Home', 'End',','
    ];

    // Permitir Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z
    if (event.ctrlKey && ['a', 'c', 'v', 'x', 'z'].includes(event.key.toLowerCase())) {
      if (event.key.toLowerCase() === 'v') {
        // Processar colagem
        event.preventDefault();
        navigator.clipboard.readText().then(text => {
          this.formatarDecimalBr(text);
        });
      }
      return;
    }
    // Permitir apenas números (ignorar qualquer outro caractere)
    if (!/^[0-9]$/.test(event.key) && !controlKeys.includes(event.key)) {
      event.preventDefault();
      return;
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pasteData = event.clipboardData?.getData('text') || '';
    this.formatarDecimalBr(pasteData);
  }

  private formatarDecimalBr(numero:string|number|null|undefined):string{
    if (numero === null || numero === undefined) {
      return '0,00';
    }
    if(typeof numero === 'string' && isNaN(parseFloat(numero))) {
      return '0,00';
    }
    if(typeof numero === 'number' && isNaN(numero)) {
      return '0,00';
    }
    if(typeof numero === 'string') {
      numero = numero.replace('.', '').replace(',', '.');
      numero = parseFloat(numero);
    }
    console.log('numero', numero);
    const num=numero.toLocaleString('pt-BR',{minimumFractionDigits: this.decimals(), maximumFractionDigits: this.decimals() });
    console.log('formatted number', num);
    return num;
  }
}
