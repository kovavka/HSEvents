import { EventType } from '../models/event.models';

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

export class GetTypeList {
	static event(): ListItem[] {
		return this.getList<EventType>(typeof (EventType), x => GetTypeDescription.event(x));
	}

	private static getList<T>(type: any, getDescription: (x: T) => string): ListItem[] {
		var list: ListItem[] = [];
		for (let item in type) {
			if (Number(item)) {
				var value = Number(item) as any as T;
				var caption = getDescription(value);
				if (caption) {
					var listItem = <ListItem>{
						value: value,
						caption: caption
					}
					list.push(listItem);
				}
			}
		}
		return list;
	}
}

export class ListItem {
	value: any;
	caption: string;
}