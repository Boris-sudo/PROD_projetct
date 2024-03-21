import {Injectable} from '@angular/core';
import {LocalstorageMethodsService} from "./localstorage-methods.service";

export interface Profile {
  avatar_id?: number;
  available_avatars?: number[];

  background_id?: number;
  available_backgrounds?: number[];

  level?: number;
  money?: number;
  streak_days?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profile: Profile = {};
  private key: string = 'profile-info';

  constructor(
    private localstorage: LocalstorageMethodsService,
  ) {
  }

  defaultProfile(): Profile {
    return {
      avatar_id: 0,
      available_avatars: [],

      background_id: 0,
      available_backgrounds: [],

      level: 0,
      money: 0,
      streak_days: 0,
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

}
