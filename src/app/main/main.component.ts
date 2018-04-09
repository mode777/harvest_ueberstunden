import { Component, OnInit } from '@angular/core';
import { HarvestService } from '../services/harvest.service';
import { TimeService } from '../services/time.service';
import { User, UserInfo } from '../models/user.model';
import { TimeEntries, TimeEntryDto, TimeEntry } from '../models/time.model';
import { Store } from '@ngrx/store';
import { GetTimeEntries, ChangeOverworkHours, ChangeDateRange } from './actions/main.actions';
import { Observable } from 'rxjs/Observable';
import { State } from './reducer/main.reducer';
import { UserService } from '../services/user.service';
import { getTimeEntries, getOverworkHours, getDateRange, getTimeEntriesRange, getTimeEntriesGrouped } from './selectors/main.selectors';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  time_entries: Observable<TimeEntry[]>;
  overwork: Observable<number>;
  date_range: Observable<[Date,Date]>;
  
  user: User;
  
  constructor(private store: Store<State>, private harvest: HarvestService, private userService: UserService) {
    store.dispatch(new GetTimeEntries());
    store.dispatch(new ChangeOverworkHours(8));
    this.user = userService.userInfo.user;
  }

  async ngOnInit() {
    this.time_entries = this.store.select(getTimeEntriesGrouped);
    this.overwork = this.store.select(getOverworkHours)
    this.date_range = this.store.select(getDateRange);
  }

  onOverWorkChange(value: number){
    this.store.dispatch(new ChangeOverworkHours(value));
  }

  onRangeChange(value: [Date,Date]){
    this.store.dispatch(new ChangeDateRange(value));
  }

  logOut(ev){
    ev.preventDefault();
    this.userService.logOut();
    window.location.reload();
  }
}
