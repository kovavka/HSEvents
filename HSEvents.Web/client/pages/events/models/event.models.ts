import { EventType } from '../../../models/event.models';

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