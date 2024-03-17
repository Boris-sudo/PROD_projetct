import { Injectable } from '@angular/core';

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
}
