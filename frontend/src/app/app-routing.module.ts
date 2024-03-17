import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from "./components/main-page/main-page.component";
import {AddHabitPageComponent} from "./components/add-habit-page/add-habit-page.component";

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'add', component: AddHabitPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
