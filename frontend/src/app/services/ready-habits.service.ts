import {Injectable} from '@angular/core';
import {HabitsCollectionModel} from "../models/habit.model";

@Injectable({
  providedIn: 'root'
})
export class ReadyHabitsService {
  public habits: HabitsCollectionModel[] = [];

  constructor() {
  }

  get_all(): HabitsCollectionModel[] {
    return this.habits;
  }

  get_collection(collection_title: string): HabitsCollectionModel {
    for (const habit_collection of this.habits)
      if (habit_collection.title == collection_title)
        return habit_collection;
    return {title: '', habits: []};
  }
}
