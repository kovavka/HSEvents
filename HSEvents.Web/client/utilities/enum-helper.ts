import { EventType } from '../models/event.models';
import { AttendeeType, SexType } from '../models/user.models';

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

    static attendee(type: AttendeeType): string {
		switch (type) {
            case AttendeeType.Pupil:
				return 'Ученик';
            case AttendeeType.Parent:
				return 'Родитель';
            case AttendeeType.Teacher:
				return 'Учитель';
			default:
				return '';
		}
	}

    static sex(type: SexType): string {
		switch (type) {
            case SexType.Male:
				return 'муж';
            case SexType.Female:
				return 'жен';
			default:
				return '';
		}
	}
}

export class GetTypeList {
	static event(): ListItem[] {
		return this.getList<EventType>(typeof (EventType), x => GetTypeDescription.event(x));
    }

    static attendee(): ListItem[] {
        return this.getList<AttendeeType>(typeof (AttendeeType), x => GetTypeDescription.attendee(x));
	}

    static sex(): ListItem[] {
        return this.getList<SexType>(typeof (SexType), x => GetTypeDescription.sex(x));
	}

	private static getList<T>(type: any, getDescription: (x: T) => string): ListItem[] {
		var list: ListItem[] = [];
		for (let item in type) {
            if (Number(item) || item == '0') {
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