import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { AppComponent } from './app.component';
import { AuthInterceptor } from './tokens/auth-interceptor.service';
import { OauthService } from './services/oauth.service';
import { AuthGuard } from './guards/auth.guard';

import { TimeEntriesReducer } from './main/reducer/main.reducer';
import { TimeEffects } from "./main/effects/main.effects";
import { UserService } from './services/user.service';
import { HolidayService } from './services/holiday.service';
import { HarvestService } from './services/harvest.service';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: './main/main.module#MainModule',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
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
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    OauthService,
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
