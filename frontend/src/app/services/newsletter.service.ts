import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(private http: HttpClient) {

  }

  addPushSubscriber(sub:any) {
    return this.http.post('https://www.googleapis.com/api/notifications', {sub,headers: {
        'Access-Control-Allow-Origin': '*'
      }});
  }

  send() {
    return this.http.post('https://www.googleapis.com/api/newsletter', null);
  }}
