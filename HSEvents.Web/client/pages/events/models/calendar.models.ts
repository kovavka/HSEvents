export class Week {
	days: EventDay[];
}

export class EventDay {
	events: EventRow[];
	day: number;
	currentMonth: boolean;
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
}

export class Event {
	name: string;
	type: EventType;
	info: string;
}

export enum EventType {
	Course = 1,
	AcademicCompetition = 2,
	SchoolWork = 3
}

export class GetTypeDescription {
	static event(type: EventType): string {
		switch (type) {
			case EventType.Course:
				return 'Курсы';
			case EventType.AcademicCompetition:
				return 'Олимпиада';
			case EventType.SchoolWork:
				return 'Работа со школами';
			default:
				return '';
		}
	}
}