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

export class AttendeeDto {
    id: number;
    login: string;
    password: string;
    type: number;
    fullName: string;
    phoneNumber: string;
    email: string;
    sex: string;
    yearOfGraduation: string;
    interestingProgramIds: number[];
    schoolId: number;
}

export class AuthInfo {
    user: User;
    token: string;
}

export class AuthArgs {
    login: string;
    password: string;
}