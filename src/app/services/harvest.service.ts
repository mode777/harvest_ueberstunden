import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TimeEntries, TimeEntryDto } from '../models/time.model';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { UserService } from './user.service';
@Injectable()
export class HarvestService {

  private baseurl = 'https://api.harvestapp.com'
  private userurl = '/v2/users/me'
  private timeurl = '/v2/time_entries'

  constructor(private http: HttpClient,private user: UserService) {
    
   }


 getTimeEntries() : Observable<TimeEntryDto[]> {
    const headers = {"Harvest-Account-Id":this.user.accountId.toString() };
    return this.http.get<TimeEntries>( this.baseurl + this.timeurl, {headers: headers})
    .map(res => res.total_pages)
    .flatMap( pages => {
      const obsarr: Observable<TimeEntryDto[]>[] = [];
      for(let i = 1; i <= pages; i++){
        let params = new HttpParams();
        params = params.append('page', i.toString());
        obsarr.push(
          this.http.get<TimeEntries>(this.baseurl + this.timeurl, {headers: headers, params: params})
          .map(ret => { console.log(ret); return ret.time_entries})
        );
      }
      return Observable.forkJoin(obsarr).map(tes => [].concat(...tes));
    });

  }
}
