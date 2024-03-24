import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, switchMap, timer} from "rxjs";
import {ProfileService} from "./services/profile.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';
  subscriptions !: Subscription;

  readonly NOTIFICATION_TIME: number = 50000;
  readonly VAPID_PUBLIC_KEY = "BEn6qZBQJSR3-PzIYJr4cru7rFhmTn5394jqF_Ufk0qv3TXqNG8_bgiV6QZxneQ-yqWFGh-5J4Vxy_uIH0d6f9k";

  constructor(
    private profile_service: ProfileService,
  ) {
  }

  ngOnInit() {
    this.subscriptions = timer(0, this.NOTIFICATION_TIME).pipe(
      switchMap(() => this.notification())
    ).subscribe(res => {
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getWindowSize() {
    return window.innerWidth;
  }

  async notification() {
    if (this.profile_service.are_all_done()) return;
    alert('может уже начнете что то делать?');
  }
}
