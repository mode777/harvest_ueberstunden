import { Injectable } from '@angular/core';
import { HarvestService } from './harvest.service';
import { TimeEntries, TimeEntryDto } from '../models/time.model';
import { Observable } from 'rxjs/Observable';

// todo: remove this service
@Injectable()
export class TimeService {

    changeOverwork(value: number): Observable<TimeEntryDto[]> {
      this.overwork = value;
      return this.harvest.getTimeEntries();
    }

    overwork : number;
  constructor(private harvest: HarvestService) {

    this.overwork = 8;


  }

  // async getOvertime( workHours: number): Promise<number>{
  //   const timeentries = new TimeEntries();
  //   this.curTimeEntries = await this.harvest.getTimeEntries(timeentries);
  //   this.allTimeEntries = this.curTimeEntries.time_entries;
  //   let entries = this.curTimeEntries;
  //   entries.page++;
  //   while(entries.page <= entries.total_pages){
  //     entries = await this.harvest.getTimeEntries(entries);
  //     this.allTimeEntries.concat(entries.time_entries);
  //   }
  //   console.log(this.allTimeEntries);
  //   return this.allTimeEntries.map(entry => entry.hours).reduce((prev,cur) => prev + cur);
  //  }

   getAllTimeEntries(): Observable<TimeEntryDto[]> {
     return this.harvest.getTimeEntries();
   }
}
