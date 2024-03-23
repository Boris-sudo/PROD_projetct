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
  public freeze_cost:number = 200;

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

  buy(type: string, id: number=0) {
    if (type=='freeze' && this.profile.money! >= this.freeze_cost && this.profile.freeze_count! < 3) {
      this.profile_service.add_freeze_count(this.freeze_cost);
      this.profile = this.profile_service.get();
    } else if (type == 'avatar' && this.profile.money! >= this.shop_avatars[id].cost) {
      const cost = this.shop_avatars[id].cost;
      id = this.avatar_service.get_id(this.shop_avatars[id]);
      this.profile_service.add_avatar(id, cost);
      this.profile = this.profile_service.get();
      this.get_shop_avatars();
    } else if (type == 'bg' && this.profile.money! >= this.shop_backgrounds[id].cost) {
      const cost = this.shop_backgrounds[id].cost;
      id = this.background_service.get_id(this.shop_backgrounds[id]);
      this.profile_service.add_background(id, this.shop_backgrounds[id].cost);
      this.profile = this.profile_service.get();
      this.get_shop_backgrounds()
    } else {
      let button:HTMLElement | undefined = undefined;
      if (type == 'freeze') button = document.getElementById('freeze-button')!;
      if (type == 'avatar') button = document.getElementById('avatar-button'+id)!;
      if (type == 'bg') button = document.getElementById('bg-button'+id)!;

      button!.classList.add('invalid');
      setTimeout(()=>{
        button!.classList.remove('invalid');
      }, 300)
    }
  }

}
