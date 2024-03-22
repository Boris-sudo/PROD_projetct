import {Component, OnInit} from '@angular/core';
import {LocalstorageMethodsService} from "../../services/localstorage-methods.service";
import {RoutingService} from "../../services/routing.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username: string = '';

  constructor(
    private localstorage: LocalstorageMethodsService,
    private router: RoutingService,
  ) {
  }

  ngOnInit(): void {
  }

  login() {
    this.localstorage.set('user', this.username);
    this.router.navigate('').then();
  }
}
