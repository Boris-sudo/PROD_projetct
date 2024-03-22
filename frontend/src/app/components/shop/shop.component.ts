import {Component, OnInit} from '@angular/core';
import {Profile, ProfileService} from "../../services/profile.service";
import {Avatar, AvatarService} from "../../services/avatar.service";
import {Background, BackgroundService} from "../../services/backgrounds";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  public profile: Profile = {};
  public shop_avatars: Avatar[] = [];
  public shop_backgrounds: Background[] = [];

  constructor(
    private profile_service: ProfileService,
    private avatar_service: AvatarService,
    private background_service: BackgroundService,
  ) {
  }

  ngOnInit(): void {
    this.profile = this.profile_service.get();
    this.get_shop_avatars();
    this.get_shop_backgrounds();
  }

  get_shop_avatars() {
    const avatars: Avatar[] = this.avatar_service.get();
    this.shop_avatars = [];
    for (let i: number = 0; i < avatars.length; i++) {
      let found: boolean = false;
      for (const id of this.profile.available_avatars!)
        if (id == i)
          found = true;
      if (!found)
        this.shop_avatars.push(avatars[i]);
    }
  }

  get_shop_backgrounds() {
    const backgrounds: Background[] = this.background_service.get();
    this.shop_backgrounds = [];
    for (let i: number = 0; i < backgrounds.length; i++) {
      let found: boolean = false;
      for (const id of this.profile.available_backgrounds!)
        if (id == i)
          found = true;
      if (!found)
        this.shop_backgrounds.push(backgrounds[i]);
    }
  }

  buy_freeze() {

  }

}
