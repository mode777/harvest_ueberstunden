import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { Action } from "@ngrx/store";

import * as timeEntryAction from '../actions/main.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { catchError } from "rxjs/operators";
import { HarvestService } from "../../services/harvest.service";
import { HolidayService } from "../../services/holiday.service";

@Injectable()
export class TimeEffects {

    @Effect()
    updateEntries: Observable<Action> = this.actions
        .ofType(timeEntryAction.CHANGE_DATE_RANGE)
        .switchMap((a: timeEntryAction.ChangeDateRange) => this.harvestService.getTimeEntries(a.value[0], a.value[1])
            .map(val => new timeEntryAction.GetTimeEntriesSuccess(val))
            .catch(err => Observable.of(new timeEntryAction.GetTimeEntriesError())));

    @Effect()
    updateHolidays: Observable<Action> = this.actions
        .ofType(timeEntryAction.CHANGE_DATE_RANGE)
        .switchMap((a: timeEntryAction.ChangeDateRange) => this.holidayService.getHolidaysInRange(a.value[0], a.value[1])
            .map(t => new timeEntryAction.GetHolidaysSuccess(t))
            .catch(err => Observable.of(new timeEntryAction.GetHolidaysError)));
    
    constructor(private harvestService: HarvestService, 
        private holidayService: HolidayService, 
        private actions: Actions){}
}