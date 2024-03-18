import { Injectable } from '@angular/core';
import {HabitModel} from "../models/habit.model";

@Injectable({
  providedIn: 'root'
})
export class LocalstorageMethodsService {

  constructor() { }

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  get(key:string) {
    let result = localStorage.getItem(key);
    if (result==null) result='';
    return result;
  }

  push(key: string, item: string) {
    let string_value = this.get(key);
    if (string_value!='') string_value+=', ';
    string_value += item;
    this.set(key, string_value);
  }

  convertJsonToString(habit:any) {
    let result = '{';
    for (const key in habit) {
      // @ts-ignore
      result += `"${key}": "${habit[key]}", `
    }
    result=result.substring(0,result.length-2);
    result+='}';
    return result;
  }
}
