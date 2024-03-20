import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {HabitModel} from "../../models/habit.model";
import {LocalstorageMethodsService} from "../../services/localstorage-methods.service";
import {CurrentDateService} from "../../services/current-date.service";
import {DoneValueService} from "../../services/done_value.service";

interface DateCard {
  date: Date;
}

@Component({
  selector: 'app-add-habit-page',
  templateUrl: './add-habit-page.component.html',
  styleUrls: ['./add-habit-page.component.css']
})
export class AddHabitPageComponent implements OnInit, AfterViewInit {
  public new_habit: HabitModel = {
    id: 0,
    title: '',
    period: 'daily',
    addDate: new Date(),
    type: 'boolean',
    targetValue: 0,
  }
  public frequency_date_type_chose: 'daily' | 'weekly' | 'monthly' = 'daily';
  public goal_type_chose: 'boolean' | 'numeric' = 'boolean';
  public target_value: string = '';
  public submenus: string[] = ['habit-frequency-dropdown-menu', 'habit-goal-dropdown-menu']

  public all_habits: HabitModel[] = [];
  public deleted_habits: HabitModel[] = [];

  public user: string = '';

  public opened_habit_id = -1;

  public near_dates: DateCard[] = [];
  public week_days: string[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sun', 'sat'];

  constructor(
    private done_value_service: DoneValueService,
    public date_service: CurrentDateService,
    public current_date_service: CurrentDateService,
    private localstorage_service: LocalstorageMethodsService,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    document.onkeyup = (e) => {
      if (e.key == 'Escape') this.closeMenu('add-habit-menu');
    };
    this.user = this.localstorage_service.get('user');
    this.get_all_habits();
    this.setNewHabitToDefault();
    // setting dates
    const delta = 15;
    for (let i = -delta; i < delta; i++) {
      let date = new Date();
      date.setDate(date.getDate() + i);
      this.near_dates.push({date: date,})
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.update_percent();
    });
    this.scrollToSelectedDate();
  }

  get_all_habits() {
    const string_value = this.localstorage_service.get('habits');
    const habits: HabitModel[] = this.localstorage_service.toJson("[" + string_value + "]");
    this.all_habits = [];
    for (const habit of habits) {
      habit.addDate = new Date(habit.addDate);
      if (habit.addDate.toJSON().split('T')[0] <= this.current_date_service.get_date())
        this.all_habits.push(habit);
    }

    for (let i = 0; i < this.all_habits.length; i++) {
      this.all_habits[i].doneValue = this.done_value_service.get(this.current_date_service.get_date(), this.all_habits[i].id);
      this.all_habits[i].targetValue = Number(this.all_habits[i].targetValue);
    }
  }

  navigateBack() {
    this.location.back();
  }

  openMenu(id: string) {
    for (const submenu of this.submenus) if (submenu != id) this.closeMenu(submenu);

    const menu = document.getElementById(id)!;
    menu.style.display = 'flex';
    setTimeout(() => {
      menu.classList.add('show');
    })
  }

  closeMenu(id: string) {
    if (this.submenus.indexOf(id) == -1) for (const submenu of this.submenus) this.closeMenu(submenu);


    const menu = document.getElementById(id)!;
    menu.classList.remove('show');
    setTimeout(() => {
      menu.style.display = 'none';
    }, 300);
  }

  changeNewHabitValue(key: string, value: string, id: string, numerical_value?: string) {

    if (key === 'period') {// @ts-ignore
      this.new_habit.period = value;
    } else if (key === 'type') {// @ts-ignore
      this.new_habit.type = value;
      if (value == 'numeric') this.new_habit.targetValue = Number(numerical_value);
    }

    this.closeMenu(id);
  }

  getGoalValue(): string {
    let result = this.new_habit.type;
    if (this.new_habit.type == 'numeric') result += `, ${String(this.new_habit.targetValue)}`;
    return result;
  }

  setNewHabitToDefault() {
    this.new_habit = {
      id: Number(this.localstorage_service.get('last-habit-id')),
      title: '',
      period: 'daily',
      addDate: new Date(),
      type: 'boolean',
      targetValue: 0,
    };
    this.frequency_date_type_chose = 'daily';
    this.target_value = '';
    this.goal_type_chose = 'boolean';
  }

  addNewHabit() {
    if (this.new_habit.type == 'boolean') this.new_habit.targetValue = 1;
    let string_habit = this.localstorage_service.convertJsonToString(this.new_habit);
    this.localstorage_service.push('habits', string_habit);
    this.closeMenu('add-habit-menu');
    this.get_all_habits();
    this.localstorage_service.set('last-habit-id', String(Number(this.localstorage_service.get('last-habit-id')) + 1));
    this.setNewHabitToDefault();
  }

  get_time() {
    const now = Number(new Date().toTimeString().substring(0, 2));
    if (now <= 6) return "night";
    else if (now <= 12) return "morning";
    else if (now <= 17) return "afternoon";
    else return "evening";
  }

  get_date() {
    let date = this.current_date_service.get_date().split('-');
    return `${date[2]}th ${this.current_date_service.months[Number(date[1])]} ${date[0]}`
  }

  update_percent() {
    for (const habit of this.all_habits) {
      let percent = 120 - habit.doneValue! / Number(habit.targetValue!) * 120;
      document.getElementById(`habit-circle${habit.id}`)!.style.strokeDashoffset = String(percent);
    }
  }

  openHabitMenu(habit: HabitModel) {
    if (this.opened_habit_id == habit.id) {
      this.closeHabitMenu();
      return;
    }
    if (this.opened_habit_id != -1) this.closeHabitMenu();
    const menu = document.getElementById('habit-container' + habit.id)!;
    this.opened_habit_id = habit.id;
    menu.style.height = 'var(--height-opened)';
  }

  closeHabitMenu() {
    const menu = document.getElementById('habit-container' + this.opened_habit_id)!;
    this.opened_habit_id = -1;
    menu.style.height = 'var(--height)';
  }

  submitHabit(habit: HabitModel) {
    if (habit.type == 'numeric') {
      // @ts-ignore
      const value: string = document.getElementById('habit-input' + habit.id)!.value;
      habit.doneValue = Number(value);
    } else {
      // @ts-ignore
      const value = document.getElementById('habit-checkbox' + habit.id)!.checked;
      habit.doneValue = value ? 1 : 0;
    }
    this.update_percent();
    this.closeHabitMenu();
    let string_value = this.localstorage_service.convertJsonArrayToString(this.all_habits);
    this.localstorage_service.set('habits', string_value);
    this.done_value_service.setById(this.current_date_service.get_date(), habit.id, habit.doneValue);
  }

  deleteHabit(habit: HabitModel) {
    this.localstorage_service.delete('habits', this.localstorage_service.convertJsonToString(habit));
    this.closeHabitMenu();
    this.get_all_habits();
  }

  scrollToSelectedDate() {
    const rollbar = document.getElementById('rollbar')!;
    const date = this.date_service.get_date();
    const element = document.getElementById('date-card' + date)!;
    const window_width = window.innerWidth < 750 ? 750 : window.innerWidth - 300;
    rollbar.scrollTo({
      left: element.offsetLeft - (window_width - 64) / 2,
      behavior: 'smooth',
    });
  }

  setDate(date: DateCard) {
    this.date_service.set_date(date.date.toJSON().split('T')[0]);
    this.scrollToSelectedDate();
    this.get_all_habits();
    setTimeout(() => {
      this.update_percent();
    });
  }
}
