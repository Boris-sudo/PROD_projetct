import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, switchMap, timer} from "rxjs";
import {ProfileService} from "./services/profile.service";
import {SwPush} from "@angular/service-worker";
import {NewsletterService} from "./services/newsletter.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';
  subscriptions !: Subscription;

  public sub?: PushSubscription;
  readonly NOTIFICATION_TIME: number = 50000;
  readonly VAPID_PUBLIC_KEY = "BFmuV8KMnqb2uDKQ16ZlZPIsXclbxof2TMSpxfFRaYkNfL28tKrZXK7CNU5SXImEVZQan_CRd6sa8_fBvzAOtZs";

  constructor(
    private profile_service: ProfileService,
    private swPush: SwPush,
    private newsletterService: NewsletterService
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

  subscribeToNotifications() {
    this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
      .then(sub => {

        this.sub = sub;

        console.log("Notification Subscription: ", sub);

        this.newsletterService.addPushSubscriber(sub).subscribe(
          () => console.log('Sent push subscription object to server.'),
          err => console.log('Could not send subscription object to server, reason: ', err)
        );

      })
      .catch(err => console.error("Could not subscribe to notifications", err));
  }


  sendNewsletter() {
    console.log("Sending Newsletter to all Subscribers ...");

    this.newsletterService.send().subscribe();
  }

  async notification() {
    if (this.profile_service.are_all_done()) return;
  }
}
