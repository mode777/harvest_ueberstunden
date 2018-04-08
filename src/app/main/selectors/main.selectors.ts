import { createSelector } from "@ngrx/store";
import { State } from "../reducer/main.reducer";
import { TimeEntry } from "../../models/time.model";

export const getTimeEntries = (state: State) => state.time_entries; 
export const getOverworkHours = (state: State) => state.overwork_hours;
export const getDateRange = (state: State) => state.date_range;

export const getWorkingDaysRange = createSelector([getDateRange], r => {
    const start = new Date(r[0].getFullYear(), r[0].getMonth(), r[0].getDate());
    const end = new Date(r[1].getFullYear(), r[1].getMonth(), r[1].getDate());
    
    const dates = [];
    
    while(start != end){
        dates.push(new Date(start.getFullYear(), start.getMonth(), start.getDay()));
        start.setDate(start.getDate() + 1);
        console.log(start);
    }
});

export const getTimeEntriesRange = createSelector([getTimeEntries, getDateRange],
    (time_entries, date_range) =>
        time_entries.filter(x => x.spent_date >= date_range[0] && x.spent_date <= date_range[1]));

export const getTimeEntriesGrouped = createSelector([getTimeEntriesRange],
    (time_entries) => {
        const grouping = time_entries.reduce<{[key: string]: TimeEntry}>((p,c) => {
            //console.log(c.spent_date.toJSON(), c.hours);
            if(!p[c.spent_date.toJSON()]) {
                p[c.spent_date.toJSON()] = {...c};
            }
            else {
                p[c.spent_date.toJSON()].hours += c.hours;
            }
            return p;
        }, {});

        return Object.keys(grouping).map(key => grouping[key]);
    });
