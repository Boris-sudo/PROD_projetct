import {Injectable} from '@angular/core';
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
  ) {
  }

  get_link(): string {
    let result = '';
    let url = window.location.href.split('/');
    for (let i = 3; i < url.length; i++)
      result += (i == 3 ? '' : '/') + url[i];
    return result;
  }

  emit_data() {
    this.observer.next({});
  }

  async navigate(url: string): Promise<void> {
    await this.router.navigate([url]);
    this.emit_data();
    return;
  }
}
