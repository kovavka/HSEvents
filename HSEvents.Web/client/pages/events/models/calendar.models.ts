export class Week {
	days: EventDay[];
}

export class EventDay {
	events: EventItem[];
	day: number;
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