import { Time } from "@angular/common";
import { HttpParams } from "@angular/common/http";


export class TimeEntry {
    id: number;
    hours: number;
    spent_date: string;
    timer_started_at: string;
    started_time: string;
    ended_time: string;
    is_running: boolean;

}


export class TimeEntries {
    user_id?: number;
    from?: string;
    to?: string;
    is_running?: boolean;
    page?: number;
    per_page?: number;
    time_entries: TimeEntry[];
    total_pages?: number;
    total_entries?: number;

    constructor(user_id?: number,from?: string, to?: string, page: number = 1, per_page: number = 100, is_running = false){
        this.user_id = user_id;
        this.from = from;
        this.to = to;
        this.page = page;
        this.per_page = per_page;
        this.is_running = is_running;
        this.time_entries = [];

    }


}