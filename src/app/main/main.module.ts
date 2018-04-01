import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { UserService } from '../services/user.service';
import { TimeService } from '../services/time.service';
import { HarvestService } from '../services/harvest.service';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TimeEntriesReducer, reducers } from './reducer/main.reducer';
import { TimeEffects } from './effects/main.effects';

const routes : Routes = [
  {
    path:'',
    component: MainComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([TimeEffects]),
    HttpClientModule
  ],
  declarations: [MainComponent],
  providers: [HarvestService, UserService, TimeService]
})
export class MainModule { }
