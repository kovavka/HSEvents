import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
	moduleId: module.id.toString(),
	selector: 'list-row',
	templateUrl: 'list-row.component.html',
	styleUrls: ['list-row.component.css'],
})
export class ListRowComponent {

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

}

export class ListRowItem {
	value: any;
	caption: string;
}
