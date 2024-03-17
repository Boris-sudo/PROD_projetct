import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-add-habit-page',
  templateUrl: './add-habit-page.component.html',
  styleUrls: ['./add-habit-page.component.css']
})
export class AddHabitPageComponent implements OnInit {

  constructor(
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit(): void {
    document.onkeyup = (e)=>{
      if (e.key=='Escape') this.close_habit_menu();
    };
  }

  navigateBack() {
    this.location.back();
  }

  open_habit_menu() {
    const menu = document.getElementById('add-habit-menu')!;
    menu.style.display = 'block';
    setTimeout(()=>{
      menu.classList.add('show');
    })
  }

  close_habit_menu() {
    const menu = document.getElementById('add-habit-menu')!;
    menu.classList.remove('show');
    setTimeout(()=>{
      menu.style.display = 'none';
    }, 300);
  }
}
