export interface UserInfo {
    user: User,
    accounts: Account[]
}

export interface Account {
    id: number,
    name: string,
    product: string
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    telephone: string;
    timezone: string;
    has_access_to_all_future_projects: boolean;
    is_contractor: boolean;
    is_admin: boolean;
    is_project_manager: boolean;
    can_see_rates: boolean;
    can_create_invoices: boolean;
    is_active: boolean;
    weekly_capacity: number;
    default_hourly_rate: number;
    cost_rate: number;
    roles: string[];
    avatar_url: string;
    created_at: Date;
    updated_at: Date;
}