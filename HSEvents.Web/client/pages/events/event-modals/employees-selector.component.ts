import { Component, Input, Output, EventEmitter, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BsModalComponent } from 'ng2-bs3-modal';
import { Employee } from '../../../models/user.models';
import { EventsService } from '../events.service';

@Component({
	moduleId: module.id.toString(),
    selector: 'employees-selector',
    templateUrl: 'employees-selector.component.html',
	styleUrls: ['../events.component.css'],
	providers: [EventsService]
})
export class EmployeesSelectorComponent implements OnDestroy {

    employees: CheckedListItem[];
    find: CheckedListItem[];
    showSelected: boolean = false;
    private searchTextSubject = new Subject<string>();
    private searchTextSubscribtion: Subscription;

    @Input()
    title: string;

	@ViewChild('modal')
    private modal: BsModalComponent;

    @ViewChild('searchInput')
    private searchInput: ElementRef;

	@Output()
    apply: EventEmitter<Employee[]> = new EventEmitter();

    constructor(private eventsService: EventsService) {
        this.searchTextSubscribtion = this.searchTextSubject.pipe(debounceTime(400),
                distinctUntilChanged())
            .subscribe(text => {
                this.showSelected = false;
                this.search(text);
            });
    }

    ngOnDestroy() {
        this.searchTextSubscribtion.unsubscribe();
    }

    get items(): CheckedListItem[] {
        if (this.showSelected)
            return this.selected;

        if (this.find)
            return this.find;

        return this.employees;
    }

    get selected(): CheckedListItem[] {
        return this.employees.filter(x => x.checked);
    }

    get showCaption(): string {
        if (!this.showSelected)
            return 'Показать выбранные';

        if (this.find)
            return 'Показать результаты поиска';

        return 'Показать все результаты';
    }

    set searchText(value: string) {
        if (value)
            this.searchTextSubject.next(value);
        else
            this.find = null;
    }

    search(text: any) {
        this.find = this.employees.filter(x => this.containsPhrase(x.employee.appointment, text) ||
            this.containsPhrase(x.employee.contactInfo.fullName, text) ||
            this.containsPhrase(x.employee.contactInfo.email, text));
    }

    containsPhrase(text: string, phrase: string): boolean {
        return text.toLowerCase().includes(phrase.toLowerCase());
    }
    
    open(selectedEmployees: Employee[]) {
        this.clear();
        this.eventsService.getEmployees().subscribe(employees => {
            if (!selectedEmployees)
                selectedEmployees = [];

            this.employees = employees
                .map(x => <CheckedListItem>{
                    checked: Boolean(selectedEmployees.find(xx => xx.id == x.id)),
                    employee: x
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
        return this.modal.open('lg');
	}

    onApplyClick() {
        this.apply.emit(this.selected.map(x => x.employee));
		this.modal.close();
	}

	onCancelClick() {
        this.clear();
		this.hideModal();
	}

    clear() {
        this.employees = [];
        this.find = null;
        this.clearSearchText();
        this.showSelected = false;
    }

    rowClick(item: CheckedListItem) {
        this.changeChecked(item);
    }

    onChecked(e: any, item: CheckedListItem) {
        e.stopPropagation();
        this.changeChecked(item);
    }

    changeChecked(item: CheckedListItem) {
        var volunteer = this.employees.find(x => x.employee.id == item.employee.id);
        volunteer.checked = !item.checked;
    }

    onShowClick() {
        this.showSelected = !this.showSelected;
    }

    clearSearchText() {
        this.searchInput.nativeElement.value = null;
        this.searchText = null;
    }
}

class CheckedListItem {
    employee: Employee;
    checked: boolean;
}