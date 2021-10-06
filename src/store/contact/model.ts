import { Country } from "../shared/model";
import { Language } from "../shared/model";

export interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zipcode: string;
    notes: string;
    created_at: Date;
    updated_at: Date;
    country_of_origin: Country;
    languages: Language[];
};