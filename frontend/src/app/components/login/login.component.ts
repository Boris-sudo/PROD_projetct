import {Component, OnInit} from '@angular/core';
import {LocalstorageMethodsService} from "../../services/localstorage-methods.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username: string = '';

  constructor(
    private localstorage: LocalstorageMethodsService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  login() {
    this.localstorage.set('user', this.username);
    this.router.navigate(['']);
  }
}
