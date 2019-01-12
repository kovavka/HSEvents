import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BsModalComponent } from 'ng2-bs3-modal';
import { EventsService } from '../events.service';
import { Department } from '../../../models/dictionaries.models';

@Component({
	moduleId: module.id.toString(),
    selector: 'departments-selector',
    templateUrl: 'departments-selector.component.html',
	styleUrls: ['../events.component.css'],
	providers: [EventsService]
})
export class DepartmentsSelectorComponent {

    departments: CheckedListItem[];
   
	@ViewChild('modal')
	private modal: BsModalComponent;

	@Output()
    apply: EventEmitter<Department[]> = new EventEmitter();

    constructor(private eventsService: EventsService)
    { }
    
    open(selectedDepartments: Department[]) {
        this.clear();
        this.eventsService.getDepartments().subscribe(departments => {
            if (!selectedDepartments)
                selectedDepartments = [];

            this.departments = departments
                .map(x => <CheckedListItem>{
                    checked: Boolean(selectedDepartments.find(xx => xx.id == x.id)),
                    department: x
                });
        });
        this.openModal();
    }

    private openModal() {
		this.openWindow().then(() => { });
	}
    
	hideModal() {
		this.modal.close();
	}

	private openWindow(): Promise<void> {
		return this.modal.open();
	}

    onApplyClick() {

        var selected = this.departments.filter(x => x.checked).map(x => x.department);
        this.apply.emit(selected);
		this.modal.close();
	}

	onCancelClick() {
        this.clear();
		this.hideModal();
	}

    clear() {
        this.departments = [];
    }

    rowClick(item: CheckedListItem) {
        item.checked = !item.checked;
    }
}

export class CheckedListItem {
    department: Department;
    checked: boolean;
}