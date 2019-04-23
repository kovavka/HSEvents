import { ContactInfo } from './other.models';

export class Employee {
    id: number;
    appointment: string;
    contactInfo: ContactInfo;
}

export class User {
    id: number;
    login: string;
    isAdmin: boolean;
    password: string;
}

export class AuthInfo {
    user: User;
    token: string;
}

export class AuthArgs {
    login: string;
    password: string;
}