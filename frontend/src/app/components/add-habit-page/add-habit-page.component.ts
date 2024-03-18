import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {HabitModel} from "../../models/habit.model";
import {LocalstorageMethodsService} from "../../services/localstorage-methods.service";

@Component({
  selector: 'app-add-habit-page',
  templateUrl: './add-habit-page.component.html',
  styleUrls: ['./add-habit-page.component.css']
})
export class AddHabitPageComponent implements OnInit {
  public new_habit: HabitModel = {
    title: '',
    period: 'daily',
    addDate: new Date(),
    type: 'boolean',
    targetValue: 0,
  }
  public frequency_date_type_chose: 'daily' | 'weekly' | 'monthly' = 'daily';
  public goal_type_chose: 'boolean' | 'numeric' = 'boolean';
  public target_value: string = '';

  public user: string = '';

  constructor(
    public localstorage_service: LocalstorageMethodsService,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    document.onkeyup = (e) => {
      if (e.key == 'Escape') this.closeMenu('add-habit-menu');
    };
    this.get_user();
  }

  get_user() {
    this.user = this.localstorage_service.get('user');
  }

  navigateBack() {
    this.location.back();
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

  changeNewHabitValue(key: string, value:string, id:string, numerical_value?: string) {

    if (key==='period') {// @ts-ignore
      this.new_habit.period = value;
    } else if (key==='type') {// @ts-ignore
      this.new_habit.type = value;
      if (value=='numeric') this.new_habit.targetValue = Number(numerical_value);
    }

    this.closeMenu(id);
  }

  getGoalValue():string {
    let result = this.new_habit.type;
    if (this.new_habit.type=='numeric') result += `, ${String(this.new_habit.targetValue)}`;
    return result;
  }

  addNewHabit() {
    let string_habit = this.localstorage_service.convertJsonToString(this.new_habit);
    this.localstorage_service.push('habits', string_habit);
  }

  get_time() {
    const now = Number(new Date().toTimeString().substring(0,2));
    if (now <= 6) return "night";
    else if (now<=12) return "morning";
    else if (now <= 17) return "afternoon";
    else return "evening";
  }

  protected readonly document = document;
}
