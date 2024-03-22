import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  observer = new Subject();
  public subscribers$ = this.observer.asObservable();

  constructor(
    private router: Router,
    private location: Location,
  ) { }

  get_link(): string {
    let result = '';
    let url = window.location.href.split('/');
    for (let i = 2; i < url.length; i++)
      result += (i==2?'':'/') + url[i];
    return result;
  }

  emit_data() {
    this.observer.next({});
  }

  navigate(url: string): Promise<boolean> {
    const result = this.router.navigate([url]);
    this.emit_data();
    return result;
  }

  navigateBack(): void {
    this.location.back();
    this.emit_data();
  }
}
