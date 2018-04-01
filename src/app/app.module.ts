import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './tokens/auth-interceptor.service';

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import {TimeEntriesReducer}from './main/reducer/main.reducer';
import { TimeEffects } from "./main/effects/main.effects";
const routes: Routes = [
  {
    path: 'home',
    loadChildren: './main/main.module#MainModule'
  },
  {
    path:'**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
]
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),

  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
