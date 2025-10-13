import { Directive, ElementRef, HostListener, input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[decimalFormat]',
  standalone: true
})
export class DecimalDirective implements OnInit {
  decimals = input<number>(2);
  private internalValue: string = '0';
  private isEditing: boolean = false;
  private hasInitialValue: boolean = false;

  constructor(
    private el: ElementRef,
    private control: NgControl
  ) {}

  ngOnInit() {
    this.formatInitialValue();
  }

  @HostListener('focus')
  onFocus(): void {
    // Ao focar, entrar em modo de edição
    this.isEditing = true;

    if (this.hasInitialValue) {
      // Se tem valor inicial, converter para modo de edição
      const currentValue = this.control?.control?.value || 0;
      this.internalValue = Math.round(currentValue * Math.pow(10, this.decimals())).toString();
      this.hasInitialValue = false;
    }

    this.updateDisplay();

    // Selecionar todo o texto
    setTimeout(() => {
      this.el.nativeElement.select();
    }, 0);
  }

  @HostListener('blur')
  onBlur(): void {
    // Sair do modo de edição
    this.isEditing = false;

    // Se campo vazio, resetar para 0
    if (!this.internalValue || this.internalValue === '') {
      this.internalValue = '0';
    }

    this.updateDisplay();
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    // Permitir teclas de controle
    const controlKeys = [
      'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      'Home', 'End', 'F5'
    ];

    // Permitir Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    if (event.ctrlKey && ['a', 'c', 'v', 'x'].includes(event.key.toLowerCase())) {
      if (event.key.toLowerCase() === 'v') {
        setTimeout(() => this.handlePastedContent(), 0);
      }
      return;
    }

    if (controlKeys.includes(event.key)) {
      if (event.key === 'Backspace' || event.key === 'Delete') {
        event.preventDefault();
        this.removeLastDigit();
      }
      return;
    }

    // Permitir apenas números
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
      return;
    }

    // Se não está editando ainda, limpar valor e começar do zero
    if (!this.isEditing) {
      this.isEditing = true;
      this.internalValue = '0';
    }

    // Adicionar dígito
    event.preventDefault();
    this.addDigit(event.key);
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pasteData = event.clipboardData?.getData('text') || '';
    this.processPastedData(pasteData);
  }

  private handlePastedContent(): void {
    const value = this.el.nativeElement.value;
    this.processPastedData(value);
  }

  private processPastedData(data: string): void {
    const numbers = data.replace(/[^0-9]/g, '');
    if (numbers && numbers.length <= 12) {
      this.internalValue = numbers;
      this.isEditing = true;
      this.updateDisplay();
    }
  }

  private addDigit(digit: string): void {
    // Limitar a 12 dígitos no total
    if (this.internalValue.length < 12) {
      // Se o valor atual for '0', substituir
      if (this.internalValue === '0') {
        this.internalValue = digit;
      } else {
        this.internalValue += digit;
      }
      this.updateDisplay();
    }
  }

  private removeLastDigit(): void {
    if (this.internalValue.length > 1) {
      this.internalValue = this.internalValue.slice(0, -1);
    } else {
      this.internalValue = '0';
    }
    this.updateDisplay();
  }

  private updateDisplay(): void {
    let numericValue: number;

    if (this.isEditing) {
      // Em modo de edição: dividir por 10^decimals (calculadora)
      numericValue = parseInt(this.internalValue) / Math.pow(10, this.decimals());
    } else {
      // Fora do modo de edição: valor direto
      numericValue = parseFloat(this.internalValue) || 0;
    }

    const formattedValue = this.formatNumber(numericValue);
    this.el.nativeElement.value = formattedValue;
    this.updateFormControl(numericValue);
  }

  private updateFormControl(value: number): void {
    if (this.control?.control) {
      this.control.control.setValue(value, { emitEvent: false });
    }
  }

  private formatNumber(value: number): string {
    return value.toFixed(this.decimals()).replace('.', ',');
  }

  private formatInitialValue(): void {
    // Se há um valor inicial no controle, formatá-lo normalmente
    if (this.control?.control?.value !== null && this.control?.control?.value !== undefined && this.control?.control?.value !== 0) {
      const initialValue = parseFloat(this.control.control.value) || 0;
      this.internalValue = initialValue.toString();
      this.hasInitialValue = true;
      this.isEditing = false;
      this.updateDisplay();
    } else {
      // Se não há valor inicial, começar com 0,00
      this.internalValue = '0';
      this.isEditing = false;
      this.updateDisplay();
    }
  }
}
