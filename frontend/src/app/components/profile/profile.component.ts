import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Profile, ProfileService} from "../../services/profile.service";
import {Avatar, AvatarService} from "../../services/avatar.service";
import {LocalstorageMethodsService} from "../../services/localstorage-methods.service";
import {Background, BackgroundService} from "../../services/backgrounds";
import {Achievement, AchievementsService} from "../../services/achievements.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  public profile: Profile = {};
  public avatar: Avatar = {cost: 0, path: ''};
  public background: Background = {cost: 0, color: '', edit_color: ''};
  public achievements: Achievement[] = [];
  public username: string = '';

  constructor(
    private achievements_service: AchievementsService,
    private localstorage: LocalstorageMethodsService,
    private profile_service: ProfileService,
    private avatar_service: AvatarService,
    private background_service: BackgroundService,
  ) {
  }

  ngOnInit(): void {
    this.profile = this.profile_service.get();
    this.avatar = this.avatar_service.get_by_id(this.profile.avatar_id!);
    this.background = this.background_service.get_by_id(this.profile.background_id!);
    this.username = this.localstorage.get('user');
    this.achievements = this.achievements_service.get_achievements();

    document.fonts.ready.then(()=>{
      const loader = document.getElementById('loader')!;
      loader.style.display = 'none';
    });
  }

  ngAfterViewInit() {
    const body = document.getElementById('body')!;
    body.style.setProperty('--profile-top-color', this.background.color);
    body.style.setProperty('--edit-image-color', this.background.edit_color);
  }

}
