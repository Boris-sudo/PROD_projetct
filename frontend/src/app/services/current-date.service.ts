import {Injectable} from '@angular/core';
import {LocalstorageMethodsService} from "./localstorage-methods.service";

@Injectable({
  providedIn: 'root'
})
export class CurrentDateService {
  public months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  private date: string = (new Date()).toJSON().split('T')[0];

  constructor(
    private localstorage_service: LocalstorageMethodsService,
  ) {
  }

  set_date(new_date: string) {
    this.date = new_date;
    this.localstorage_service.set('date', this.date);
  }

  get_date() {
    if (this.localstorage_service.get('date') == '')
      this.set_date(this.date);
    else
      this.date = this.localstorage_service.get('date');
    return this.date;
  }

  get_date_date() {
    return new Date(this.date);
  }

  next_day() {
    let currentDate=new Date(this.date);
    currentDate.setDate(currentDate.getDate() + 1);
    this.set_date(currentDate.toJSON().split('T')[0]);
  }

  prev_day() {
    let currentDate=new Date(this.date);
    currentDate.setDate(currentDate.getDate() - 1);
    this.set_date(currentDate.toJSON().split('T')[0]);
  }
}
