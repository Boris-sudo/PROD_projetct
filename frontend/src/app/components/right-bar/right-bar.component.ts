import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router, withDebugTracing} from "@angular/router";
import {CurrentDateService} from "../../services/current-date.service";
import {navBarLinks} from "../../app-routing.module";

@Component({
  selector: 'app-right-bar',
  templateUrl: './right-bar.component.html',
  styleUrls: ['./right-bar.component.css']
})
export class RightBarComponent implements OnInit, AfterViewInit {
  public right_bar_links = navBarLinks;


  constructor(
    private router: Router,
    private date_service: CurrentDateService,
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    document.getElementById('current-data-input1')!.value = this.date_service.get_date();
    this.move_nav_background();
    console.log(window.location.href);
  }

  navigate(url: string) {
    this.router.navigate([url]).then(
      resp=>{
        this.move_nav_background();
      }
    );
  }

  move_nav_background() {
    const nav_bg = document.getElementById('nav-bg')!;
    const url = this.get_url();
    let found = false;
    for (const rightBarLink of this.right_bar_links)
      if (rightBarLink.url == url) found = true;
    if (!found) {
      nav_bg.style.opacity='0';
      setTimeout(() => {
        nav_bg.style.display = 'none';
      }, 500);
    } else {
      const element = document.getElementById('right-bar-nav-item' + url)!;
      nav_bg.style.top = `${element.offsetTop}px`;
      nav_bg.style.left = `${element.offsetLeft}px`;

      nav_bg.style.display='block';
      setTimeout(()=>{
        nav_bg.style.opacity='1';
      })
    }
  }

  chose_date() {
    const date_input = document.getElementById('current-data-input1')!;
    // @ts-ignore
    const date = date_input.value;
    if (date != '')
      this.date_service.set_date(date);
  }

  next_day() {
    this.date_service.next_day();
    // @ts-ignore
    document.getElementById('current-data-input1')!.value = this.date_service.get_date();
  }

  prev_day() {
    this.date_service.prev_day();
    // @ts-ignore
    document.getElementById('current-data-input1')!.value = this.date_service.get_date();
  }

  get_url() {
    const url = window.location.href.split('/');
    let result = '';
    for (let url_index = 3; url_index < url.length; url_index++) {
      if (url_index!=3) result += '/';
      result += url[url_index];
    }
    return result;
  }
}
