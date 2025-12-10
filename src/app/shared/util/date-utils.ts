export class DateUtil{
  static parseDateStringBR(dateString:string):Date{
      const dateSplit = dateString.split('/');
      const day = parseInt(dateSplit[0], 10);
      const month = parseInt(dateSplit[1], 10);
      const year = parseInt(dateSplit[2], 10);
      // Month is 0-indexed in JavaScript Date objects, so subtract 1
      return new Date(year, month - 1, day);
  }

  static compareDates(date1: Date, date2: Date): number {
      const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
      const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

      if (d1 < d2) {
          return -1;
      } else if (d1 > d2) {
          return 1;
      } else {
          return 0;
      }
  }
}
