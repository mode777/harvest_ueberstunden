
import * as TimeEntriesAction from '../actions/main.actions';
import {TimeEntries, TimeEntry} from "../../models/time.model";
export type Action = TimeEntriesAction.All;

export interface State {
    time_entries: TimeEntry[],
    overwork_hours: number
}
export function TimeEntriesReducer(state : TimeEntry[] = [] , action: Action){
    switch(action.type){
        case TimeEntriesAction.GET_TIME_ENTRIES_SUCCESS: {
            const act = action as TimeEntriesAction.GetTimeEntriesSuccess;
            return act.time_entries.sort( (a,b) => Date.parse(a.spent_date) - Date.parse(b.spent_date));
        }
        case TimeEntriesAction.GET_TIME_ENTRIES_ERROR: {
            return [];
        }
        default: return state;
    }
}


export const reducers = {
    time_entries : TimeEntriesReducer
}