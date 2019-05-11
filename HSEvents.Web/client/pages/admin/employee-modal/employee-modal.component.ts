import { Component, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { Employee, User, UserType } from '../../../models/user.models';
import { ContactInfo } from '../../../models/other.models'

@Component({
    moduleId: module.id.toString(),
    selector: 'employee-modal',
    templateUrl: 'employee-modal.component.html'
})
export class EmployeeModalComponent implements OnInit{

    id: number;
    appointment: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    login: string;
    password: string;
    hasUser: boolean;
    isAdmin: boolean;
    userId: number;
    
    @ViewChild('modal')
    private modal: BsModalComponent;
    
    @Output()
    apply: EventEmitter<Employee> = new EventEmitter();

    
    ngOnInit() {
        this.modal.onHide.subscribe(x => this.clear());
    }

    get title(): string {
        if (this.id)
            return 'Редактирование адреса';

        return 'Добавление адреса';
    }
    
    open(employee: Employee) {
        this.initModal(employee);
        this.modal.open();
    }

    initModal(employee: Employee) {
        this.id = employee.id;
        this.appointment = employee.appointment;

        if (employee.contactInfo) {
        this.fullName = employee.contactInfo.fullName;
        this.phoneNumber = employee.contactInfo.phoneNumber;
        this.email = employee.contactInfo.email;
        }
        if (employee.user) {
            this.hasUser = true;
            this.userId = employee.user.id;
            this.login = employee.user.login;
            this.password = null;
            this.isAdmin = employee.user.type === UserType.Admin;
        } else {
            this.hasUser = false;
            this.isAdmin = false;
        }
    }
    
    onApplyClick() {
        var userType: UserType = this.isAdmin ? UserType.Admin : UserType.Employee;
        console.log(userType);
        var user = this.hasUser
            ? <User> {
                id: this.userId,
                login: this.login,
                password: this.password,
                type: userType
            }
            : null;

        this.apply.emit(<Employee> {
            id: this.id,
            appointment: this.appointment,
            user: user,
            contactInfo: <ContactInfo> {
                fullName: this.fullName,
                phoneNumber: this.phoneNumber,
                email: this.email,
            }
        });
        this.modal.close();
    }

    onCancelClick() {
        this.clear();
        this.modal.close();
    }

    refreshPassword() {
        this.password = Math.random().toString(36).slice(-8);
    }

    clear() {
        this.id = null;
        this.userId = null;
        this.appointment = null;
        this.fullName = null;
        this.phoneNumber = null;
        this.email = null;
        this.login = null;
        this.password = null;
        this.hasUser = false;
        this.isAdmin = false;
    }
}