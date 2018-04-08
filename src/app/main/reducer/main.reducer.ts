import * as TimeEntriesAction from '../actions/main.actions';
import {TimeEntries, TimeEntryDto, TimeEntry} from "../../models/time.model";
export type Action = TimeEntriesAction.All;

export interface State {
    time_entries: TimeEntry[],
    overwork_hours: number,
    date_range: [Date,Date]
}

export function TimeEntriesReducer(state : TimeEntryDto[] = [], action: TimeEntriesAction.All){
    switch(action.type){
        case TimeEntriesAction.GET_TIME_ENTRIES_SUCCESS: {
            const act = action as TimeEntriesAction.GetTimeEntriesSuccess;
            return act.time_entries
                .map(x => new TimeEntry(x))
                // todo: this belongs in a selector
                .sort( (a,b) => b.spent_date.getTime() - a.spent_date.getTime());
        }
        case TimeEntriesAction.GET_TIME_ENTRIES_ERROR: {
            return [];
        }
        default: return state;
    }
}

const intialDateRange = [
    new Date('2015-01-01'),
    new Date()
]

export function DateRangeReducer(state: Date[] = intialDateRange, action: TimeEntriesAction.All){
    console.log(state);
    switch(action.type){
        case TimeEntriesAction.CHANGE_DATE_RANGE: {
            return (<TimeEntriesAction.ChangeDateRange>action).value;
        }
        default: return state;
    }
}

export const reducers = {
    time_entries : TimeEntriesReducer,
    date_range: DateRangeReducer
}