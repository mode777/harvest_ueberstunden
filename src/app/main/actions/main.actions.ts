import { Action } from "@ngrx/store";
import { TimeEntry } from "../../models/time.model";



export const GET_TIME_ENTRIES = 'GET_TIME_ENTRIES';
export const GET_TIME_ENTRIES_ERROR ='GET_TIME_ENTRIES_ERROR';
export const GET_TIME_ENTRIES_SUCCESS = 'GET_TIME_ENTREIS_SUCCESS';

export class GetTimeEntries implements Action {
    type: string = GET_TIME_ENTRIES;
}


export class GetTimeEntriesError implements Action {
    type: string = GET_TIME_ENTRIES_ERROR;
}

export class GetTimeEntriesSuccess implements Action {
    type: string = GET_TIME_ENTRIES_SUCCESS;
    time_entries: TimeEntry[];
    constructor(data: TimeEntry[]){
        this.time_entries = data;
    }
}

export interface State {
    time_entries: TimeEntry[]
}

export type All = GetTimeEntries | GetTimeEntriesError | GetTimeEntriesSuccess;