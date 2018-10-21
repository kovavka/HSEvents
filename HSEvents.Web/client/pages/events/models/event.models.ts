export class Week {
	days: EventDay[];
}

export class EventDay {
	events: EventRow[];
	date: Date;
}

export class EventRow {
	id: number;
	name: string;
	color: string;
	type: EventType;
	info: string;
	dateAndTime: string;
	address: string;
}

export class Month {
	weeks: Week[];
	name: string;
}

export class RowEventArgs {
	row: EventRow;
	target: any;
	week: number;
	dayOfWeek: number;
	weekCount: number;
}

export class EventModel {
	id: number;
	name: string;
	type: EventType;
    subject: Subject;
	info: string;
	comment: string;
    duration: number;
	executions: EventExecution[];
    departments: Department[];
    volunteers: Volunteer[];
    lecturers: Employee[];
    organizers: Employee[];
    purchases: Purchase[];
}

export enum EventType {
    Course = 1,
    AcademicCompetition = 2,
    SchoolWork = 3
}

export class EventExecution {
	id: number;
	dates: EventDate[];
	address: Address;
}

export class EventDate {
	id: number;
	date: Date;
	startTime: string;
	endTime: string;
}

//Todo: перенести в соответствующие файлы
export class Address {
	id: number;
	caption: string;
	shortName: string;
}

export class Purchase {
    id: number;
    name: string;
    price: number;
    description: string;
}

export class Department {
	id: number;
	name: string;
	color: string;
}

export class Volunteer {
	id: number;
	fullName: string;
    group: Group;
}

export class Employee {
	id: number;
    appointment: string;
    contactInfo: ContactInfo;
}

export class ContactInfo {
	id: number;
	fullName: string;
    phoneNumber: string;
    email: string;
}

export class Group {
	name: string;
}

export class Subject {
	id: number;
	caption: string;
}
