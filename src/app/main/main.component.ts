import { Component, OnInit } from '@angular/core';
import { HarvestService } from '../services/harvest.service';
import { TimeService } from '../services/time.service';
import { User, UserInfo } from '../models/user.model';
import { TimeEntries, TimeEntry } from '../models/time.model';
import { Store } from '@ngrx/store';
import { GetTimeEntries, ChangeOverworkHours } from './actions/main.actions';
import { Observable } from 'rxjs/Observable';
import { State } from './reducer/main.reducer';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  time_entries: Observable<Array<TimeEntry>>;
  overwork: Observable<number>;
  user: User;
  
  constructor(private store: Store<State>, private harvest: HarvestService, private userService: UserService) {
    store.dispatch(new GetTimeEntries());
    store.dispatch(new ChangeOverworkHours(8));
    console.log(userService.userInfo.user);
    this.user = userService.userInfo.user;
  }

  async ngOnInit() {
    this.time_entries = this.store.select(state => {
      return state.time_entries;
    });
    this.overwork = this.store.select(state => {
      return state.overwork_hours;
    })
  }
  onOverWorkChange(value: number){
    this.store.dispatch(new ChangeOverworkHours(value));
  }

  logOut(ev){
    ev.preventDefault();
    this.userService.logOut();
    window.location.reload();
  }
}
