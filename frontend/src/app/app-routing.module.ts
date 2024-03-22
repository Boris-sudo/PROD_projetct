import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from "./components/main-page/main-page.component";
import {AddHabitPageComponent} from "./components/add-habit-page/add-habit-page.component";
import {LoginComponent} from "./components/login/login.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {ChoosingAvatarComponent} from "./components/choosing-avatar/choosing-avatar.component";
import {ShopComponent} from "./components/shop/shop.component";

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'habits', component: AddHabitPageComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'login', component: LoginComponent},
  {path: 'settings/avatar', component: ChoosingAvatarComponent},
];

export interface NavBarLink {
  name: string;
  url: string;
}
export const navBarLinks: NavBarLink[] = [
  {name: 'habits', url: 'habits'},
  {name: 'shop', url: 'shop'},
  {name: 'profile', url: 'profile'},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
