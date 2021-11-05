import { Country } from "../shared/model";
import { Language } from "../shared/model";

export interface Visit {
    id?: string;
    created_at: Date;
    created_by: string;
    contact_id: number;
    note: string;
    mood: number;
};
export interface Contact {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    name: string;
    email: string;
    phone?: string;
    street: string;
    city: string;
    state: string;
    zipcode: string;
    notes?: string;
    country_of_origin?: Country;
    languages?: Language[];
    is_archived?: boolean;
    visits?: Visit[];
};
