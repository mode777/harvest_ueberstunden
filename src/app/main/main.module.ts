import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { TimeService } from '../services/time.service';
import { HarvestService } from '../services/harvest.service';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TimeEntriesReducer, reducers } from './reducer/main.reducer';
import { TimeEffects } from './effects/main.effects';
import { logger } from './reducer/meta.reducer';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
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
    })
  ],
  declarations: [MainComponent],
  providers: [HarvestService, TimeService]
})
export class MainModule { }
