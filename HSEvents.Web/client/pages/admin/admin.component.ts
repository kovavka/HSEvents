import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AbstractComponent } from '../../utilities/abstract.component';
import { EmployeeService } from './employee.service';
import { Employee } from '../../models/user.models';
import { EmployeeModalComponent } from './employee-modal/employee-modal.component';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'admin.component.html',
    providers: [ EmployeeService ]

})
export class AdminComponent extends AbstractComponent implements OnInit {

    data: Employee[] = [];
    loading: boolean = false;

    constructor(protected router: Router,
        protected employeeService: EmployeeService,
        protected authService: AuthService,
        protected changeDetectorRef: ChangeDetectorRef) {
        super(changeDetectorRef, authService);
    }

    ngOnInit() {
        this.getAll();
    }

    @ViewChild('modal')
    private modal: EmployeeModalComponent;


    getAll() {
        this.employeeService.getAll()
            .subscribe(data => {
                this.data = data;
            });
    }

    onAddClick() {
        this.modal.open(new Employee());
    }

    onEditClick(employee: Employee) {
        this.modal.open(employee);
    }

    onDeleteClick(employee: Employee) {
        this.loading = true;
        this.employeeService.delete(employee.id)
            .subscribe(x => {
                this.getAll();
            });
    }

    onModalApply(employee: Employee) {
        if (employee.id)
            this.update(employee);
        else
            this.add(employee);
    }

    private add(employee: Employee) {
        this.employeeService.add(employee)
            .subscribe(x => {
                this.getAll();
            });
    }

    private update(employee: Employee) {
        this.employeeService.update(employee)
            .subscribe(x => {
                this.getAll();
            });

    }
}
