import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { AddHabitPageComponent } from './components/add-habit-page/add-habit-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TopBarComponent,
    AddHabitPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
