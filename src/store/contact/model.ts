import { Country } from "../country/model";
import { Language } from "../language/model";

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