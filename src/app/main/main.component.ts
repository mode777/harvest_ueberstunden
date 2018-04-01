import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { HarvestService } from '../services/harvest.service';
import { TimeService } from '../services/time.service';
import { User } from '../models/user.model';
import { TimeEntries, TimeEntry } from '../models/time.model';
import { Store } from '@ngrx/store';
import { GetTimeEntries, State } from './actions/main.actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  time_entries: Observable<Array<TimeEntry>>;
  constructor(private store: Store<State>) {
    store.dispatch(new GetTimeEntries());

   }

  ngOnInit() {
    this.time_entries = this.store.select(state => {
      return state.time_entries;
  });
  }

}
