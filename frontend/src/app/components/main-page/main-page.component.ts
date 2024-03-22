import {AfterViewInit, Component, OnInit} from '@angular/core';
import {LocalstorageMethodsService} from "../../services/localstorage-methods.service";
import {RoutingService} from "../../services/routing.service";



@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, AfterViewInit {
  public user: string = '';

  constructor(
    private localstorage: LocalstorageMethodsService,
    private router: RoutingService,
  ) { }

  ngOnInit(): void {
    // getting user
    this.user = this.localstorage.get('user');
    if (this.user == '')
      this.router.navigate('login').then();
  }

  ngAfterViewInit() {
  }
}
