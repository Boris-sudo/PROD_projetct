import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

interface TopBarLink {
  name: string;
  url: string;
}

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  public top_bar_links: TopBarLink[] = [
    {name: '', url: ''},
  ]

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
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
    this.router.navigate([url]);
  }
}
