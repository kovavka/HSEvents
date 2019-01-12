import { Address } from './address.models';
import { ContactInfo } from './other.models';

export class School {
    id: number;
    name: string;
    type: SchoolType;
    number: number;
    belongToUniversityDistrict: boolean;
    hasPriority: boolean;
    addresses: Address[];
    contacts: ContactPerson[];
}

export class SchoolType {
    id: number;
    name: string;
}

export class ContactPerson {
    id: number;
    appointment: string;
    contactInfo: ContactInfo;
}