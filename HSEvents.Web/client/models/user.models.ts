import { ContactInfo } from './other.models';

export class Employee {
    id: number;
    appointment: string;
    contactInfo: ContactInfo;
    user: User;
}

export class User {
    id: number;
    login: string;
    type: UserType;
    password: string;
}

export class AttendeeDto {
    id: number;
    login: string;
    password: string;
    type: AttendeeType;
    fullName: string;
    phoneNumber: string;
    email: string;
    sex: SexType;
    yearOfGraduation: string;
    interestingProgramIds: number[];
    schoolId: number;
}

export class AuthInfo {
    user: User;
    employee: Employee;
    attendee: AttendeeDto;
    token: string;
}

export class AuthArgs {
    login: string;
    password: string;
}

export enum SexType {
    Male = 0,
    Female = 1
}

export enum AttendeeType {
    Pupil = 1,
    Parent = 2,
    Teacher = 3
}

export enum UserType {
    Attendee = 1,
    Employee = 2,
    Admin = 3
}