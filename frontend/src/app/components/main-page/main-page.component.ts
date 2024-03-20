import {AfterViewInit, Component, OnInit} from '@angular/core';
import {LocalstorageMethodsService} from "../../services/localstorage-methods.service";
import {Router} from "@angular/router";
import {CurrentDateService} from "../../services/current-date.service";



@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, AfterViewInit {
  public user: string = '';

  constructor(
    public date_service: CurrentDateService,
    private localstorage: LocalstorageMethodsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // getting user
    this.user = this.localstorage.get('user');
    if (this.user == '')
      this.router.navigate(['login']).then();
  }

  ngAfterViewInit() {
  }
}
