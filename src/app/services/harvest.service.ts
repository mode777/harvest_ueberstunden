import { Injectable } from '@angular/core';
import { User, UserInfo } from '../models/user.model';
import { HttpClient, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TimeEntries, TimeEntry } from '../models/time.model';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { UserService } from './user.service';
@Injectable()
export class HarvestService {

  private baseurl = 'https://api.harvestapp.com'
  private timeurl = '/v2/time_entries'

  constructor(private http: HttpClient, private user: UserService) {

  }

  getTimeEntries(): Observable<TimeEntry[]> {
    const headers = { "Harvest-Account-Id": this.user.accountId.toString() };
    
    const obs = this.http.get(this.baseurl + this.timeurl, { headers: headers })
    let flat = obs.flatMap(res => {
      const te = res as TimeEntries;
      let obs2: Observable<TimeEntry[]>[] = [];
      for (let i = te.page; i <= te.total_pages; i++) {
        let params = new HttpParams();
        params = params.append('page', i.toString());

        obs2.push(Observable.forkJoin(this.http.get(this.baseurl + this.timeurl, { params: params, headers: headers }).map(res2 => {
          return (<TimeEntries>res2).time_entries;
        })).map(val => <TimeEntry[]>[].concat.apply([], val)));

      }
      const retob = Observable.from(obs2).mergeAll();
      return retob;
    });
    return flat;
  }
}
