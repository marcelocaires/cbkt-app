import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sinarm'
})
export class SinarmPipe implements PipeTransform {

  transform(value: string):string{
    return this.convertToSinarm(value);
  }

  parse(value: string|number):string|number{
    let valorFormatado = value + '';
    valorFormatado = valorFormatado
      .padEnd(15, '0')
      //.substr(0, 15)
      .replace(/[^0-9]/, '')
      .replace(
          /(\d{4})(\d{9})(\d{2})/,
          '$1/$2-$3'
      );
    return valorFormatado;
  }

  private convertToSinarm(value:string|number):string{
    if (value) {
      if(typeof value==='number') {
        value = value.toString();
        value = value.replace(/\D/g, "");
      }
      switch (value.length) {
        case 4:
          value = value.replace(/(\d+)(\d{4})/,'$1/');
          break;
        case 5:
          value = value.replace(/(\d+)(\d{4})(\d{1})/,'$1/$2');
          break;
        case 6:
          value = value.replace(/(\d+)(\d{4})(\d{2})/,'$1/$2');
          break;
        case 7:
          value = value.replace(/(\d+)(\d{4})(\d{3})/,'$1/$2');
          break;
        case 8:
          value = value.replace(/(\d+)(\d{4})(\d{4})/,'$1/$2');
          break;
        case 9:
          value = value.replace(/(\d+)(\d{4})(\d{5})/,'$1/$2');
          break;
        case 10:
          value = value.replace(/(\d+)(\d{4})(\d{6})/,'$1/$2');
          break;
        case 11:
          value = value.replace(/(\d+)(\d{4})(\d{7})/,'$1/$2');
          break;
        case 12:
          value = value.replace(/(\d+)(\d{4})(\d{8})/,'$1/$2');
          break;
        case 13:
          value = value.replace(/(\d+)(\d{4})(\d{9})/,'$1/$2');
          break;
        case 14:
          value = value.replace(/(\d+)(\d{4})(\d{9})(\d{1})/,'$1/$2-$3');
          break;
        case 15:
          value = value.replace(/(\d+)(\d{4})(\d{9})(\d{2})/,'$1/$2-$3');
          break;
      }
    }
    return value.toString();
  }
}
