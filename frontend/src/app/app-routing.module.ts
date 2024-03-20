import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from "./components/main-page/main-page.component";
import {AddHabitPageComponent} from "./components/add-habit-page/add-habit-page.component";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'habits', component: AddHabitPageComponent},
  {path: 'explore', component: AddHabitPageComponent},
  {path: 'profile', component: AddHabitPageComponent},
  {path: 'login', component: LoginComponent},
];

export interface NavBarLink {
  name: string;
  url: string;
}
export const navBarLinks: NavBarLink[] = [
  {name: 'habits', url: 'habits'},
  {name: 'explore', url: 'explore'},
  {name: 'profile', url: 'profile'},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
