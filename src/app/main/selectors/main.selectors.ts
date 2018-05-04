import { createSelector, MemoizedSelector } from "@ngrx/store";
import { State } from "../reducer/main.reducer";
import { TimeEntry, OverWorkInfo } from "../../models/time.model";

export const getTimeEntries = (state: State) => state.time_entries; 
export const getOverworkHours = (state: State) => state.overwork_hours;
export const getDateRange = (state: State) => state.date_range;

export const getWorkingDaysRange = createSelector([getDateRange], r => {
    
    const current = new Date(r[0].getTime());
    const endValue = getDateString(r[1]);
    const today = new Date();
    let currentValue = getDateString(current); 
        
    const dates = {};
    
    while(true) {
        currentValue = getDateString(current);

        dates[currentValue] = (current.getDay() === 0 || current.getDay() === 6 || current > today)
            ? 0
            : 8;    
            
        if(currentValue === endValue)
            break;
            
        current.setDate(current.getDate() + 1);
    }
    return dates;
});

export const getTimeEntriesRange = createSelector([getTimeEntries, getDateRange],
    (time_entries, date_range) =>
        time_entries.filter(x => x.spent_date >= date_range[0] && x.spent_date <= date_range[1]));

export const getTimeEntriesGrouped = createSelector([getTimeEntriesRange],
    (time_entries) => groupMap(time_entries, x => getDateString(x.spent_date), (k, x) => ({
        time: x[0].spent_date,
        hours: x.reduce((p,c) => p + c.hours, 0),
        key: k
    })));

export const getOverworkInfo: MemoizedSelector<State, OverWorkInfo[]> = createSelector([getTimeEntriesGrouped, getWorkingDaysRange],(entries, days) => entries.map(x => ({
    time: x.time,
    hours: x.hours,
    quota: days[x.key]
})));

//export const getOverworkWeeks: MemoizedSelector<State, OverWorkInfo[]> = 

export const getOverworkTotal = createSelector([getOverworkInfo], (entries) => entries.reduce<number>((p,c) => p += (c.hours - c.quota), 0));

function getDateString(date: Date){
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}

function getWeekString(date: Date){
    const d: any = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart: any = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    const week = Math.ceil((((d - yearStart) / 86400000) + 1)/7);
    return  `${date.getFullYear()}-${week}`; 
  };
  

function groupMap<T,V>(list: T[], keySelector: (x: T) => string | number, transformer: (key: string, group: T[]) => V){
    const g = list.reduce<{[key:string]: T[]}>((p,c) => {
        const k = keySelector(c);
        p[k] = p[k] ? p[k] : [];
        p[k].push(c);
        return p;
    }, {});
    return Object.keys(g).map(k => transformer(k, g[k]));     
}

// example for groupMap: Count letters
//console.log(groupMap('Hallo Welt'.split(''), (c) => c, (c,cs) => ({ char: c, count: cs.length})));
