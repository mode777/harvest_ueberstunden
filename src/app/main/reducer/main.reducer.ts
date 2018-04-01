
import * as TimeEntriesAction from '../actions/main.actions';
import {TimeEntries, TimeEntry} from "../../models/time.model";
export type Action = TimeEntriesAction.All;

export interface State {
    all_time_entries: TimeEntry[];
    current_time_entries: TimeEntries;
}
export function TimeEntriesReducer(state : TimeEntry[] = [] , action: Action){
    switch(action.type){
        case TimeEntriesAction.GET_TIME_ENTRIES_SUCCESS: {
            const act = action as TimeEntriesAction.GetTimeEntriesSuccess;
            return state.concat(act.time_entries);
        }
        default: return state;
    }
}

export const reducers = {
    time_entries : TimeEntriesReducer
}