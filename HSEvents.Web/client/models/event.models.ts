import { SubjectModel, Department, Volunteer } from './dictionaries.models';
import { Employee } from './user.models';
import { Address } from './address.models';

export class EventModel {
	id: number;
	name: string;
	type: EventType;
    subject: SubjectModel;
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

export class Purchase {
    id: number;
    name: string;
    price: number;
    description: string;
}