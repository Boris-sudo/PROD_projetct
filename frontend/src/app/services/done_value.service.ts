import {Injectable} from '@angular/core';
import {LocalstorageMethodsService} from "./localstorage-methods.service";

@Injectable({
  providedIn: 'root'
})
export class DoneValueService {
  private key: string = 'tasks-done-value';


  constructor(
    private localstorage: LocalstorageMethodsService,
  ) {
  }

  getAll(date: string, id: number) {
    if (this.localstorage.get(this.key) == '') this.localstorage.set(this.key, '{}');
    let values = JSON.parse(this.localstorage.get(this.key));
    if (values[date] == undefined) values[date] = {};
    if (values[date][id] == undefined) values[date][id] = 0;
    return values;
  }

  get(date: string, id: number) {
    let values = this.getAll(date,id);
    this.setAll(values);
    return values[date][id];
  }

  setById(date: string, id: number, value: number) {
    let values = this.getAll(date,id);
    values[date][id] = value;
    this.setAll(values);
  }

  setAll(value: any) {
    let string = this.toJsonJsonToString(value);
    this.localstorage.set(this.key, string);
  }

  toJsonJsonToString(a: any) {
    let result = '{';
    for (const key in a) {
      result += '"' + key + '": ' + this.localstorage.convertJsonToString(a[key]);
      result += ', ';
    }
    result = result.substring(0, result.length - 2);
    result += '}';
    return result;
  }
}
