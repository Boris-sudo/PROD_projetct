import {Injectable} from '@angular/core';
import {LocalstorageMethodsService} from "./localstorage-methods.service";

export interface Achievement {
  title: string;
  level: number;
  have_progress: number;
  need_progress: number[];
  about_text?: string;
  about: string;
  img_path: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {
  private achievements: Achievement[] = [];
  private colors: string[] = ['#0000f4', '#8814cb', '#5bc226',];
  private key: string = 'achievements';

  constructor(
    private localstorage: LocalstorageMethodsService,
  ) {
  }

  defaultAchievements(): Achievement[] {
    return [
      {
        title: 'Работяга',
        level: 0,
        have_progress: 0,
        need_progress: [5,10,15,30,50,100],
        about: '',
        img_path: 'fire.svg',
        color: '',
      },
    ];
  }

  to_localstorage() {
    this.localstorage.set(this.key, JSON.stringify(this.achievements));
  }

  from_localstorage() {
    let result = this.localstorage.get(this.key);
    if (result == '') this.achievements = this.defaultAchievements();
    else this.achievements = JSON.parse(result);
    this.to_localstorage();
  }

  get_achievements(): Achievement[] {
    this.from_localstorage();
    for (const achievement of this.achievements) {
      achievement.about_text = achievement.about.replace('$', String(achievement.need_progress[achievement.level]));
      achievement.color = this.get_color(achievement.level);
    }
    return this.achievements;
  }

  get_color(level: number): string {
    return this.colors[level];
  }

  add_progress(id: number, xp: number) {
    this.from_localstorage();
    this.achievements[id].have_progress += xp;
    if (this.achievements[id].have_progress >= this.achievements[id].need_progress[this.achievements[id].level]) {
      this.achievements[id].level++;
      if (this.achievements[id].need_progress.length < this.achievements[id].level)
        this.achievements[id].level--;
    }
    this.to_localstorage();
  }
}
