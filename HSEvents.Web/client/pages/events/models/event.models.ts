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
	info: string;
	executions: EventExecution[];
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

export class Address {
	id: number;
	caption: string;
}

export enum EventType {
	Course = 1,
	AcademicCompetition = 2,
	SchoolWork = 3
}