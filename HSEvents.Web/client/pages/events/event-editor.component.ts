import { DatePipe } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, ViewChild} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventModel, EventExecution, EventDate, Subject, Department, Volunteer, Employee } from './models/event.models';
import { GetTypeList, ListItem } from '../../utilities/enum-helper';
import { EventsService } from './events.service';
import { ListRowItem, ListInfo } from '../../controls/list-row/list-row.component';
import { ExecutionEditorComponent, EventExecutionArgs } from './event-modals/execution-editor.component';
import { DepartmentsSelectorComponent } from './event-modals/departments-selector.component';
import { VolunteersSelectorComponent } from './event-modals/volunteers-selector.component';
import { EmployeesSelectorComponent } from './event-modals/employees-selector.component';

@Component({
	moduleId: module.id.toString(),
	selector: 'event-editor',
	templateUrl: 'event-editor.component.html',
	styleUrls: ['events.component.css'],
	providers: [EventsService]
})
export class EventEditorComponent implements OnInit{

	model: EventModel = new EventModel();
	types: ListItem[];
	subjects: Subject[];
	
	@ViewChild('executionEditor')
    private executionEditor: ExecutionEditorComponent;

    @ViewChild('departmentsSelector')
    private departmentsSelector: DepartmentsSelectorComponent;

    @ViewChild('volunteersSelector')
    private volunteersSelector: VolunteersSelectorComponent;

    @ViewChild('lecturersSelector')
    private lecturersSelector: EmployeesSelectorComponent;

    @ViewChild('organizersSelector')
    private organizersSelector: EmployeesSelectorComponent;

	constructor(private eventsService: EventsService) {
	}

	
	@Input()
	set event(value: EventModel) {
		if (!value) {
			this.model = new EventModel();
			this.model.executions = [];
            this.model.type = 1;
		    this.model.departments = [];
		    this.model.volunteers = [];
		}
		else
            this.model = value;
	}
	
	@Input()
	date: Date;


	@Output()
	finished = new EventEmitter();

	ngOnInit() {
		this.types = GetTypeList.event();
        this.eventsService.getSubjects()
            .subscribe((subjects: Subject[]) => {
                this.subjects = subjects;
                this.model.subject = subjects[0];
                }
	    );
	}
	
	set name(value: string) {
		this.model.name = value;
	}

	get name(): string {
		return this.model.name;
	}

	get executions(): ListRowItem[] {
		if (!this.model.executions)
			return null;
		
		return this.model.executions.map(x => <ListRowItem>{
			value: x,
			caption: x.address.shortName,
			info: this.generateExecutionInfo(x)
		});
	}

	generateExecutionInfo(execution: EventExecution): ListInfo[] {
		var address = [<ListInfo>{
			columns: [
				'Адрес',
				execution.address.caption
			]
		}];

		var datesCaption = <ListInfo>{ columns: ['Даты проведения'] };

		var dates = execution.dates.map(x => <ListInfo>{
			columns: [
				'',
				this.generateDate(x)
			]
		});

		return address.concat(datesCaption).concat(dates);
	}

	generateDate(eventDate: EventDate): string {
		const datePipe: DatePipe = new DatePipe('ru-Ru');
		var date = datePipe.transform(new Date(eventDate.date), 'shortDate');

		if (eventDate.startTime && eventDate.endTime)
			return `${date}, с ${eventDate.startTime} до ${eventDate.endTime}`;

		if (!eventDate.startTime && !eventDate.endTime)
			return date;

		var str = `${date}, `;
		if (eventDate.startTime)
			str += `с ${eventDate.startTime}`;
		if (eventDate.endTime)
			str += `до ${eventDate.endTime}`;

		return str;

    }

    onSubjectChange(id: number) {
        this.model.subject = this.subjects.filter(x => x.id == id)[0];
    }

    onSaveClick($event) {
        console.log(this.model);
		this.saveOrUpdate(this.model).subscribe(x => {
			console.log(x);
			this.finished.emit($event);
		});
	}

	saveOrUpdate(event: EventModel): Observable<any>  {
		if (event.id)
			return this.eventsService.update(event);

		return this.eventsService.add(event);
	}

	onCancelClick($event) {
		this.finished.emit($event);
	}

	onAddExecution() {
		this.executionEditor.add(this.date);
	}

	onEditExecution(execution: EventExecution) {
		var index = this.model.executions.indexOf(execution);
		this.executionEditor.edit(execution, index);
	}

	onDeleteExecution(execution: EventExecution) {
		this.model.executions.splice(this.model.executions.indexOf(execution), 1);
	}

	onExecutionApply(args: EventExecutionArgs) {
		if (args.editMode) {
			this.model.executions[args.index] = args.execution;
		}
		else {
			this.model.executions.push(args.execution);
		}
    }

    onEditDepartments() {
        this.departmentsSelector.open(this.model.departments);
    }

    onDepartmentsApply(selected: Department[]) {
        this.model.departments = selected;
    }

    onEditVolunteers() {
        this.volunteersSelector.open(this.model.volunteers);
    }

    onEditLecturers() {
        this.lecturersSelector.open(this.model.lecturers);
    }

    onEditOrganizers() {
        this.organizersSelector.open(this.model.organizers);
    }

    onVolunteersApply(selected: Volunteer[]) {
        this.model.volunteers = selected;
    }

    onLecturersApply(selected: Employee[]) {
        this.model.lecturers = selected;
    }

    onOrganizersApply(selected: Employee[]) {
        this.model.organizers = selected;
    }

}