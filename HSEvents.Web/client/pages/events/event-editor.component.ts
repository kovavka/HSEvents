import { DatePipe } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, ViewChild} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventModel, EventExecution, EventDate, Purchase } from '../../models/event.models';
import { SubjectModel, Department, Volunteer } from '../../models/dictionaries.models';
import { Employee } from '../../models/user.models';
import { GetTypeList, ListItem } from '../../utilities/enum-helper';
import { EventsService } from './events.service';
import { ExecutionEditorComponent, EventExecutionArgs } from './event-modals/execution-editor.component';
import { DepartmentsSelectorComponent } from './event-modals/departments-selector.component';
import { VolunteersSelectorComponent } from './event-modals/volunteers-selector.component';
import { EmployeesSelectorComponent } from './event-modals/employees-selector.component';
import { PurchaseEditorComponent, PurchaseArgs } from './event-modals/purchase-editor.component';

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
    subjects: SubjectModel[];
    dropDownExecution: EventExecution;
    dropDownPurchase: Purchase;
	
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

    @ViewChild('purchaseEditor')
    private purchaseEditor: PurchaseEditorComponent;

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
            .subscribe((subjects: SubjectModel[]) => {
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

    get executions(): EventExecution[] {
		if (!this.model.executions)
			return null;

	    return this.model.executions;
    }

    executionClick(execution: EventExecution) {
        this.dropDownExecution = execution;
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

    get purchases(): Purchase[] {
        if (!this.model.purchases)
            return null;

        return this.model.purchases;
    }

    purchaseClick(purchase: Purchase) {
        this.dropDownPurchase = purchase;
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

    onAddPurchase() {
        this.purchaseEditor.add();
    }

    onEditPurchase(purchase: Purchase) {
        var index = this.model.purchases.indexOf(purchase);
        this.purchaseEditor.edit(purchase, index);
    }

    onDeletePurchase(purchase: Purchase) {
        this.model.purchases.splice(this.model.purchases.indexOf(purchase), 1);
    }

    onPurchaseApply(args: PurchaseArgs) {
        if (args.editMode) {
            this.model.purchases[args.index] = args.purchase;
        }
        else {
            this.model.purchases.push(args.purchase);
        }
    }

}