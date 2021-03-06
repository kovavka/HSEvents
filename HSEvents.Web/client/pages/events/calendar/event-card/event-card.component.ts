﻿import { Component, Output, ChangeDetectorRef, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { EventRow, RowEventArgs } from '../../models/event.models';
import { GetTypeDescription } from '../../../../utilities/enum-helper';
import Attendeemodalcomponent = require("../../attendees-modal/attendees-modal.component");
import AttendeesSelectorComponent = Attendeemodalcomponent.AttendeesSelectorComponent;

declare var jQuery;

@Component({
	moduleId: module.id.toString(),
	selector: 'event-card',
	templateUrl: 'event-card.component.html',
	styleUrls: ['../calendar.component.css']
})
export class EventCardComponent implements OnDestroy{

	event: EventRow;
	target: any;
	week: any;
	dayOfWeek: any;
	weekCount: any;

	top: number = 300;
	left: number = 100;
	visible: boolean = false;
	timer: any;
	
	@Output()
	visibleChange: EventEmitter<boolean> = new EventEmitter();

	@Output()
	editClick: EventEmitter<number> = new EventEmitter();

	@Output()
	deleteClick: EventEmitter<number> = new EventEmitter();


    @ViewChild('attendeesSelector')
    private attendeesSelector: AttendeesSelectorComponent;


	constructor(private changeDetector: ChangeDetectorRef) {
		
	}

	ngOnDestroy(): void {
		clearTimeout(this.timer);
	}

	initPosition() {
		if (!this.target)
			return;

		var anchorBox = this.target.getBoundingClientRect();
		var anchorTop = anchorBox.y || anchorBox.top;
		var anchorLeft = anchorBox.x || anchorBox.left;

		var top = 0;
		var left = 0;

		var popupHeight = 200;
		var popupWidth = 475;

		var windowHeight = jQuery(window).height();
		var windowWidth = jQuery(window).width();

		if (windowHeight > 600 && windowWidth > 865) {
			if (this.week < 4 && this.weekCount >= 5 || this.week < 3 && this.weekCount == 4)
				top = anchorTop + anchorBox.height + 10;
			else
				top = anchorTop - popupHeight - 10;

			if (this.dayOfWeek < 5)
				left = anchorLeft;
			else
				left = anchorLeft + anchorBox.width - popupWidth;
		} else {
			top = 108;
			left = (windowWidth - popupWidth) / 2;
		}

		this.top = top;
		this.left = left;
	}

	toggle(args: RowEventArgs) {
		if (args.target == this.target) {
			this.hide();
			return;
		}

		this.event = args.row;
		this.target = args.target;
		this.dayOfWeek = args.dayOfWeek;
		this.weekCount = args.weekCount;
		this.week = args.week;

		this.initPosition();
		this.show();
	}

	show() {
		clearTimeout(this.timer);
		this.visible = true;
		this.visibleChange.emit(true);
		this.changeDetector.detectChanges();
	}

	hide() {
		this.event = null;
		this.target = null;
		this.dayOfWeek = null;
		this.weekCount = null;
		this.week = null;
		this.visible = false;
		this.visibleChange.emit(false);
		this.changeDetector.detectChanges();
	}

	get type(): string {
		return GetTypeDescription.event(this.event.type);
	}

	onEdit($event) {
		this.editClick.emit(this.event.id);
		this.hide();
	}

	onDelete($event) {
		this.deleteClick.emit(this.event.id);
		this.hide();
	}

	onDocumentClick($event) {
		if (this.visible && this.target != $event.target)
			this.timer = setTimeout(() => {
				this.hide();
			}, 100);
	}

	onResize($event) {
		this.hide();
	}

	onClick($events) {
		clearTimeout(this.timer);
    }

    onAttendeesClick() {
        this.attendeesSelector.open(this.event.id);
    }
}
