import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { AddHabitPageComponent } from './components/add-habit-page/add-habit-page.component';
import {FormsModule} from "@angular/forms";
import { RightBarComponent } from './components/right-bar/right-bar.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoaderComponent } from './components/loader/loader.component';
import { AchievementLevelUpComponent } from './components/achievement-level-up/achievement-level-up.component';
import { ChoosingAvatarComponent } from './components/choosing-avatar/choosing-avatar.component';
import { ShopComponent } from './components/shop/shop.component';
import { HubComponent } from './components/hub/hub.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TopBarComponent,
    AddHabitPageComponent,
    RightBarComponent,
    LoginComponent,
    ProfileComponent,
    LoaderComponent,
    AchievementLevelUpComponent,
    ChoosingAvatarComponent,
    ShopComponent,
    HubComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
