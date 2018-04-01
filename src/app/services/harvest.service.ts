import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TimeEntries, TimeEntry } from '../models/time.model';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class HarvestService {

  private baseurl = 'https://api.harvestapp.com'
  private userurl = '/v2/users/me'
  private timeurl = '/v2/time_entries'
  headers = new HttpHeaders({
    Authorization: `Bearer ${environment.access_token}`,
    'Harvest-Account-Id': `${environment.account_id}`
  })
  constructor(private http: HttpClient) {
    
   }


  async getUser(): Promise<User> {
   
    const res = await this.http.get(this.baseurl + this.userurl, {headers: this.headers}).toPromise();
    return <User>res;
  }

  // async getTimeEntries(entries: TimeEntries): Promise<TimeEntries>{
  //   let headers= this.headers;
  //   let params = entries.toParams();
  //   const res = await this.http.get(this.baseurl + this.timeurl,  {headers: headers, params: params}).toPromise();
  //   const ret = res as TimeEntries;
  //   return ret;
  // }

 getTimeEntries() : Observable<TimeEntry[]> {
    const headers = this.headers;
    const obs = this.http.get(this.baseurl + this.timeurl, {headers: headers})
    let flat = obs.flatMap( res =>  {
      const te = res as TimeEntries;
      let obs2  : Observable<TimeEntry[]>[] = [];
      for(let i = te.page; i <= te.total_pages; i++){
        let params = new HttpParams();
        params = params.append('page',i.toString());

        obs2.push(Observable.forkJoin(this.http.get(this.baseurl + this.timeurl, {headers: headers, params: params}).map(res2 => {
          return (<TimeEntries>res2).time_entries;
        })).map( val => <TimeEntry[]>[].concat.apply([],val)));

      }
      const retob = Observable.from(obs2).mergeAll();
      return retob;
    });
    return flat;
  }
}
