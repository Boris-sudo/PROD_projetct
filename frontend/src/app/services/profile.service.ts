import {Injectable} from '@angular/core';
import {LocalstorageMethodsService} from "./localstorage-methods.service";
import {CurrentDateService} from "./current-date.service";
import {HabitModel} from "../models/habit.model";
import {DoneValueService} from "./done_value.service";
import {AchievementsService} from "./achievements.service";

export interface Profile {
  avatar_id?: number;
  available_avatars?: number[];

  background_id?: number;
  available_backgrounds?: number[];

  level?: number;
  money?: number;
  streak_days?: number;
  habits_complete?: number;

  freeze_count?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profile: Profile = {};
  private key: string = 'profile-info';

  constructor(
    private localstorage: LocalstorageMethodsService,
    private date_service: CurrentDateService,
    private done_value_service: DoneValueService,
    private achievement_service: AchievementsService,
  ) {
  }

  defaultProfile(): Profile {
    return {
      avatar_id: 0,
      available_avatars: [0, 1, 2, 3],

      background_id: 0,
      available_backgrounds: [0, 1],

      level: 0,
      money: 0,
      streak_days: 0,
      habits_complete: 0,

      freeze_count: 0,
    }
  }

  to_localstorage() {
    this.localstorage.set(this.key, JSON.stringify(this.profile));
  }

  from_localstorage() {
    let result = this.localstorage.get(this.key);
    if (result == '') this.profile = this.defaultProfile();
    else this.profile = JSON.parse(result);
    this.to_localstorage();
  }

  get(): Profile {
    this.from_localstorage();
    return this.profile;
  }

  set(profile: Profile) {
    this.profile = profile;
    this.to_localstorage();
  }

  add_daily_streak() {
    this.from_localstorage();
    this.profile.streak_days!++;
    this.to_localstorage();
    this.achievement_service.set_progress(0, this.profile.streak_days!);
  }

  reset_daily_streak() {
    this.from_localstorage();
    this.profile.streak_days = 0;
    this.to_localstorage();
    this.achievement_service.set_progress(0, this.profile.streak_days);
  }

  get_tasks(): HabitModel[] {
    const date: string = this.date_service.get_date();
    const string_value: string = this.localstorage.get('habits');
    let all_habits: HabitModel[] = this.localstorage.toJson("[" + string_value + "]");
    let habits: HabitModel[] = [];

    for (const habit of all_habits) {
      habit.addDate = new Date(habit.addDate);
      if (habit.addDate.toJSON().split('T')[0] <= date)
        habits.push(habit);
    }
    for (let i = 0; i < habits.length; i++) {
      habits[i].doneValue = this.done_value_service.get(date, habits[i].id);
      habits[i].targetValue = Number(habits[i].targetValue);
    }

    return habits;
  }

  count_done(): number {
    const habits: HabitModel[] = this.get_tasks();
    let result = 0;

    for (const habit of habits)
      if (habit.doneValue == habit.targetValue)
        result++;

    return result;
  }

  are_all_done(): boolean {
    const habits: HabitModel[] = this.get_tasks();
    const solved_count: number = this.count_done();

    return habits.length == solved_count;
  }

  add_completed_habits_count(count: number) {
    this.from_localstorage();
    this.profile.habits_complete! += count;
    this.achievement_service.set_progress_ignore_max(2, this.profile.habits_complete!);
    this.to_localstorage();
  }

  add_level_point(sign: number) {
    const level_points = sign * 100;

    this.from_localstorage();
    this.profile.level! += level_points;
    this.achievement_service.set_progress_ignore_max(1, this.profile.level!);
    this.to_localstorage();
  }

  add_money(sign: number) {
    const money = sign * 100;

    this.from_localstorage();
    this.profile.money! += money;
    this.achievement_service.set_progress_ignore_max(3, this.profile.money!);
    this.to_localstorage();
  }

  add_freeze_count(cost: number) {
    this.from_localstorage();
    this.profile.freeze_count!++;
    this.profile.money! -= cost;
    this.add_money(0);
    this.to_localstorage();
  }

  add_avatar(id: number, cost: number) {
    this.from_localstorage();
    this.profile.available_avatars!.push(id);
    this.profile.money! -= cost;
    this.to_localstorage();
    this.add_money(0);
  }

  add_background(id: number, cost: number) {
    this.from_localstorage();
    this.profile.available_backgrounds!.push(id);
    this.profile.money! -= cost;
    this.to_localstorage();
    this.add_money(0);
  }
}
