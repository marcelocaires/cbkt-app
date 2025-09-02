export class Util{
  static textoToNumero(numero: String):number{
    let temp=numero.replace(".","");
    temp=temp.replace(",",".");
    return parseFloat(temp);
  }
  static isNumber(numero:string){
    return !isNaN(parseFloat(numero));
  }
  static compareString(a: string, b: string, isAsc: boolean) {
    if(!a){
      return -1 * (isAsc ? 1 : -1);
    }
    if(!b){
      return 1* (isAsc ? 1 : -1);
    }
    return a.localeCompare(b, 'da-DK') * (isAsc ? 1 : -1);
  }
  static compareNumber(a: number, b: number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  static compareDate(a: string, b: string, isAsc: boolean) {
    if(a && b){
      var aDate = new Date(a);
      var bDate = new Date(b);
      return (aDate.getTime() < bDate.getTime()? -1 : 1) * (isAsc ? 1 : -1);
    }else{
      if(a){
        return -1 * (isAsc ? 1 : -1);
      }
      if(b){
        return 1* (isAsc ? 1 : -1);
      }
    }
    return 0;
  }

  static converterDataExtensoBR(dataISO:any) {
    const data = new Date(dataISO);
    const diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    const diaSemana = diasDaSemana[data.getDay()];
    const dia = data.getDate();
    const mes = meses[data.getMonth()];
    const ano = data.getFullYear();

    return `${dia} de ${mes.toLocaleLowerCase()} de ${ano}`;
  }


  static formatarDataExtensoBR(data:any) {
    const day = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"][data.getDay()];
    const date = data.getDate();
    const month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"][data.getMonth()];
    const year = data.getFullYear();
    return `${date} de ${month} de ${year}`;
  }
  static formatarDataBR(data:any) {
    const date = data.getDate()<10?`0${data.getDate()}`:data.getDate();
    const month = ["01","02","03","04","05","06","07","08","09","10","11","12"][data.getMonth()];
    const year = data.getFullYear();
    return `${date}/${month}/${year}`;
  }

  public static formatNumber(n:number):string{
    let x = n.toString();
    let pattern = /(-?\d+)(\d{3})/;
    while(pattern.test(x))
      x = x.replace(pattern, "$1.$2");
    return x;
  }

  public static sortObjectsArrayByField(array:any[],field:any) {
    return array.sort((a, b) => {
      if (a[field] < b[field]) {
        return -1;
      }
      if (a[field] > b[field]) {
        return 1;
      }
      return 0;
    });
  }


}
