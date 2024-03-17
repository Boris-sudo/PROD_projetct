import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CurrentDateService} from "../../services/current-date.service";

interface TopBarLink {
  name: string;
  url: string;
}

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit, AfterViewInit {
  public top_bar_links: TopBarLink[] = [
    {name: 'add habit', url: 'add'},
  ]

  constructor(
    private router: Router,
    private date_service: CurrentDateService,
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    document.getElementById('current-data-input')!.value = this.date_service.get_date();
  }

  open_menu() {
    const menu = document.getElementById('menu')!;
    const background = document.getElementById('menu-background')!;

    menu.style.display = 'flex';
    background.style.display = 'block';
    setTimeout(() => {
      menu.classList.add('opened')
      background.classList.add('opened');
    });
  }

  close_menu() {
    const menu = document.getElementById('menu')!;
    const background = document.getElementById('menu-background')!;

    menu.classList.remove('opened')
    background.classList.remove('opened');
    setTimeout(() => {
      menu.style.display = 'none';
      background.style.display = 'none';
    }, 500);
  }

  navigate(url: string) {
    this.router.navigate([url]).then();
    this.close_menu();
  }

  chose_date() {
    const date_input = document.getElementById('current-data-input')!;
    // @ts-ignore
    const date = date_input.value;
    if (date!='')
      this.date_service.set_date(date);
  }

  next_day() {
    this.date_service.next_day();
    // @ts-ignore
    document.getElementById('current-data-input')!.value = this.date_service.get_date();
  }
  prev_day() {
    this.date_service.prev_day();
    // @ts-ignore
    document.getElementById('current-data-input')!.value = this.date_service.get_date();
  }
}
