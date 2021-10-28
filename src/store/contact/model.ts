import { Country } from "../shared/model";
import { Language } from "../shared/model";

export interface Contact {
    id?: string;
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
};
