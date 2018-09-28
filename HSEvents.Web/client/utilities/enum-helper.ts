import { EventType } from '../pages/events/models/calendar.models';

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

	static getList() {
		var keys = Object.keys(EventType).filter(x => typeof EventType[x as any] === "number");
		var values = keys.map(x => EventType[x as any]);
		console.log(keys);
		console.log(values);
	}
}

export class GetTypeList {
	static event(): ListItem[] {
		return this.getList<EventType>(x => GetTypeDescription.event(x));
	}

	private static getList<T>(getDescription: (x: T) => string): ListItem[]  {
		var list: ListItem[] = [];

		for (let item in EventType) {
			if (Number(item)) {
				var value = Number(item) as any as T;
				var listItem = <ListItem>{
					value: value,
					caption: getDescription(value)
				}
				list.push(listItem);
			}
		}
		return list;
	}
}

export class ListItem {
	value: any;
	caption: string;
}