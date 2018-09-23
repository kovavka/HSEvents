export class Week {
	days: EventDay[];
}

export class EventDay {
	events: EventItem[];
	day: number;
	currentMonth: boolean;
}

export class EventItem {
	id: number;
	name: string;
	color: string;
}

export class Month {
	weeks: Week[];
	name: string;
}

export class Event
{
	name: string;
	type: EventType;
	info: string;
}

export enum EventType {
	Course = 1,
	AcademicCompetition = 2,
	SchoolWork = 3
}