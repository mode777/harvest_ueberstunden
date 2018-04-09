import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { BsDatepickerModule } from 'ngx-bootstrap';

import { TimeService } from '../services/time.service';
import { HarvestService } from '../services/harvest.service';
import { TimeEntriesReducer, reducers } from './reducer/main.reducer';
import { TimeEffects } from './effects/main.effects';
import { logger } from './reducer/meta.reducer';
import { MainComponent } from './main.component';

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
    StoreModule.forRoot(reducers,{metaReducers: [logger]}),
    EffectsModule.forRoot([TimeEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    BsDatepickerModule.forRoot()
  ],
  declarations: [MainComponent],
  providers: [HarvestService, TimeService]
})
export class MainModule { }
