import { Component, OnInit } from '@angular/core';
import {LocalstorageMethodsService} from "../../services/localstorage-methods.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  public user: string = '';

  constructor(
    private localstorage: LocalstorageMethodsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user = this.localstorage.get('user');
    if (this.user == '')
      this.router.navigate(['login']).then();
  }



  openMenu(id: string) {
    const menu = document.getElementById(id)!;
    menu.style.display = 'flex';
    setTimeout(() => {
      menu.classList.add('show');
    })
  }

  closeMenu(id: string) {
    const menu = document.getElementById(id)!;
    menu.classList.remove('show');
    setTimeout(() => {
      menu.style.display = 'none';
    }, 300);
  }
}
