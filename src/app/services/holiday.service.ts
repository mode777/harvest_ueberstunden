import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { range } from '../helpers';

type Holidays = { [name: string]: Holiday }

interface Holiday {
    datum: string,
    hinweis: string;
}

const baseUrl = 'https://feiertage-api.de/api/';

// Remove holydays not relevant for nuremberg
function filter(holydays: Holidays){
    const copy = { ...holydays };    
    copy["Heiligabend"] 
    console.log(copy);
    delete copy['Augsburger Friedensfest'];
    delete copy['Mariä Himmelfahrt'];
    delete copy['Buß- und Bettag'];
    
    return copy
}

@Injectable()
export class HolidayService {  

    constructor(private http: HttpClient) {}

    getHolidayMultiplier(date: Date){
        if(date.getMonth() === 11 && date.getDate() === 24)
            return 0.5;
        else if(date.getMonth() === 11 && date.getDate() === 31)
            return 0.5;
        else
            return 1;
    }

    getHolidaysInRange(start: Date, end: Date) {
        const startYear = moment(start).year();
        const endYear = moment(end).year();
        console.log(start, end, startYear, endYear)

        // create an observable containing a holiday object array with the years
        return Observable.forkJoin(range(startYear, endYear)
            .map(x => this.http.get<Holidays>(baseUrl, {
                params: {
                    jahr: x.toString(),
                    nur_land: 'by'
                }
            })
            // filter non nuremberg holidays
            .map(filter)))        
            // get arrays of dates
        .map(x => x.map(y => Object.keys(y)
                .map(key => y[key].datum))
                // merge into single array
                .reduce<string[]>( (p,c) => [ ...p, ...c ], [])
                // parse dates
                .map(y => moment(y)));        
    }
}