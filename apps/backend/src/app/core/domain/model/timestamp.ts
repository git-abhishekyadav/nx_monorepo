export class Timestamp {

  private _timestamp: number;

  private constructor(timestamp: number) {
    this._timestamp = timestamp;
  }

  public static create(): Timestamp {
    const now = new Date;
    const utcTimestamp = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 
      now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), 0);

    return new Timestamp(utcTimestamp);
  }
  public static fromNumber(timestamp: number) {
    return new Timestamp(timestamp * 1000);
  }

  public static fromDate(date: Date): Timestamp {
    const utcTimestamp = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 
    date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), 0);
    return !isNaN(utcTimestamp) ? new Timestamp(utcTimestamp) : this.create();
  }

  // date shifted to match UTC time
  public static fromDateToUTCTimestamp(date: Date): Timestamp {
    if(isNaN(date.getTime())) {
      return this.create();
    }
    const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return this.fromDate(utcDate);
  }

  public static getFormatedDate(date: Date, format:string='MM/DD/YYYY') {
    const currDate = date.getDate() <= 9 ? '0' + date.getDate() : date.getDate();
    const currMonth = date.getMonth() < 9 ? '0' + (date.getMonth()+1) : (date.getMonth() + 1);
    const currYear = date.getFullYear();
    let returnDate = '';

    switch (format) {
      case 'MM/DD/YYYY':
        returnDate = currMonth + '/' + currDate + '/' + currYear;
        break;

      case 'MM/YYYY':
        returnDate = currMonth + '/' + currYear;
        break;
      case 'DD-MM-YYYY':
        returnDate = currDate + '-' + currMonth + '-' + currYear;
        break;
      default:
        returnDate = currMonth + '/' + currDate + '/' + currYear
        break;
    }
    return returnDate.includes('NaN') ? '' : returnDate;
  }

  public toPersistance(): number {
    return this._timestamp / 1000;
  }

  public getTimestamp(): number {
    return this._timestamp;
  }

  public toDate(): Date {
    return new Date(this._timestamp);
  }

  public toDateForEmail(): string {
    return this.toDate().toISOString().substring(0,10);
  }
}