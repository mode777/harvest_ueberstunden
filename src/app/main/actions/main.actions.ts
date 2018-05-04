import { Action } from "@ngrx/store";
import { TimeEntryDto } from "../../models/time.model";

export const GET_TIME_ENTRIES = 'GET_TIME_ENTRIES';
export const GET_TIME_ENTRIES_ERROR ='GET_TIME_ENTRIES_ERROR';
export const GET_TIME_ENTRIES_SUCCESS = 'GET_TIME_ENTRIES_SUCCESS';
export const CHANGE_DATE_RANGE = 'CHANGE_DATE_RANGE';


export class GetTimeEntries implements Action {
    type = GET_TIME_ENTRIES;
}

export class GetTimeEntriesError implements Action {
    type = GET_TIME_ENTRIES_ERROR;
}

export class GetTimeEntriesSuccess implements Action {
    type = GET_TIME_ENTRIES_SUCCESS;
    constructor(public time_entries: TimeEntryDto[]){}
}

export class ChangeDateRange implements Action {
    type = CHANGE_DATE_RANGE;
    constructor(public value: [Date,Date]){}
}

export type All = GetTimeEntries | 
    GetTimeEntriesError | 
    GetTimeEntriesSuccess | 
    ChangeDateRange;