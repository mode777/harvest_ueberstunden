import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { TimeService } from "../../services/time.service";
import { Action } from "@ngrx/store";

import * as timeEntryAction from '../actions/main.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { catchError } from "rxjs/operators";
@Injectable()
export class TimeEffects {

    @Effect()
    update: Observable<Action>= this.actions
        .ofType(timeEntryAction.GET_TIME_ENTRIES)
        .switchMap(() => {
            return this.timeService.getAllTimeEntries().map(val => new timeEntryAction.GetTimeEntriesSuccess(val));
        }
    ).catch(err => Observable.of(new timeEntryAction.GetTimeEntriesError()));

    @Effect()
    overworkChanged: Observable<Action> = this.actions
        .ofType(timeEntryAction.CHANGE_OVERWORK_HOURS)
        .switchMap((action) => {
            const act = action as timeEntryAction.ChangeOverworkHours;
            return this.timeService.changeOverwork(act.value).map(val => new timeEntryAction.GetTimeEntriesSuccess(val));
        }
    ).catch(err => Observable.of(new timeEntryAction.GetTimeEntriesError()));
    constructor(private timeService: TimeService, private actions: Actions){}
}