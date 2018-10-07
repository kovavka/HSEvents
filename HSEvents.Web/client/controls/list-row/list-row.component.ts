import { Component, Input, Output, EventEmitter} from '@angular/core';
import { ObjectUtils } from '../../utilities/object-helper';

@Component({
	moduleId: module.id.toString(),
	selector: 'list-row',
	templateUrl: 'list-row.component.html',
	styleUrls: ['list-row.component.css'],
})
export class ListRowComponent {

	dropDown: ListRowItem;

	@Input()
	items: ListRowItem[];

	@Output()
	editClick: EventEmitter<ListRowItem> = new EventEmitter();

	@Output()
	deleteClick: EventEmitter<ListRowItem> = new EventEmitter();

	onEdit(item: ListRowItem) {
		this.editClick.emit(item.value);
	}

	onDelete(item: ListRowItem) {
		this.deleteClick.emit(item.value);
	}

	itemClick(item: ListRowItem) {
		if (this.dropDown && this.dropDown.value === item.value)
			this.dropDown = null;
		else
			this.dropDown = item;
	}
}

export class ListRowItem {
	value: any;
	caption: string;
	info: ListInfo[];
}
export class ListInfo {
	columns: string[];
}


