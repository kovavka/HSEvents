import { Component, Output, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { EventRow, RowEventArgs, GetTypeDescription } from '../../models/calendar.models';

declare var jQuery;

@Component({
	moduleId: module.id.toString(),
	selector: 'event-card',
	templateUrl: 'event-card.component.html',
	styleUrls: ['../calendar.component.css']
})
export class EventCardComponent {

	event: EventRow;
	target: any;

	top: number =300;
	left: number = 100;
	visible: boolean;
	
	@Output()
	editClick: EventEmitter<number> = new EventEmitter();

	@Output()
	deleteClick: EventEmitter<number> = new EventEmitter();
	
	constructor(private changeDetector: ChangeDetectorRef) {
		
	}


	initPosition() {
		if (!this.target)
			return;

		var anchorBox = this.target.getBoundingClientRect();

		this.top = (anchorBox.y || anchorBox.top) + anchorBox.height + 20;
		this.left = anchorBox.x || anchorBox.left;
	}

	show(args: RowEventArgs) {
		this.event = args.row;
		this.target = args.target;

		this.visible = true;
		this.initPosition();
		console.log(args);
	}

	get type(): string {
		return GetTypeDescription.event(this.event.type);
	}

	onEdit($event) {
		this.editClick.emit(this.event.id);
	}

	onDelete($event) {
		this.deleteClick.emit(this.event.id);
	}
}
