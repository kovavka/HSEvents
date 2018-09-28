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
	name: string;
	type: EventType;
	info: string;
}

export enum EventType {
	Course = 1,
	AcademicCompetition = 2,
	SchoolWork = 3
}