import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CurrentDateService} from "../../services/current-date.service";
import {navBarLinks} from "../../app-routing.module";
import {ProfileService} from "../../services/profile.service";
import {LoaderComponent} from "../loader/loader.component";

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
    private profile_service: ProfileService,
  ) {
  }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    document.getElementById('current-data-input')!.value = this.date_service.get_date();
    this.move_nav_background();
  }

  navigate(url: string) {
    this.router.navigate([url]).then(() => {
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
      nav_bg.style.opacity = '0';
      setTimeout(() => {
        nav_bg.style.display = 'none';
      }, 500);
    } else {
      const element = document.getElementById('right-bar-nav-item' + url)!;
      nav_bg.style.top = `${element.offsetTop}px`;
      nav_bg.style.left = `${element.offsetLeft}px`;

      nav_bg.style.display = 'block';
      setTimeout(() => {
        nav_bg.style.opacity = '1';
      })
    }
  }



  check_all_habits_done() {
    const are_done = this.profile_service.are_all_done();

    if (are_done)
      this.profile_service.add_daily_streak();
    else
      this.profile_service.reset_daily_streak();
  }

  chose_date() {
    LoaderComponent.show_loader();
    this.check_all_habits_done();

    const date_input = document.getElementById('current-data-input')!;
    // @ts-ignore
    const date = date_input.value;
    if (date != '')
      this.date_service.set_date(date);

    LoaderComponent.hide_loader();
  }

  next_day() {
    LoaderComponent.show_loader();
    this.check_all_habits_done();

    this.date_service.next_day();
    // @ts-ignore
    document.getElementById('current-data-input')!.value = this.date_service.get_date();

    LoaderComponent.hide_loader();
  }

  prev_day() {
    LoaderComponent.show_loader();
    this.check_all_habits_done();

    this.date_service.prev_day();
    // @ts-ignore
    document.getElementById('current-data-input')!.value = this.date_service.get_date();

    LoaderComponent.hide_loader();
  }

  get_url() {
    const url = window.location.href.split('/');
    let result = '';
    for (let url_index = 3; url_index < url.length; url_index++) {
      if (url_index != 3) result += '/';
      result += url[url_index];
    }
    return result;
  }
}
