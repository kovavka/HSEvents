import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HseHttpClient } from '../../services/hse-httpclient';
import { Subject, Department, Volunteer } from '../../models/dictionaries.models';
import { Address } from '../../models/address.models';


@Injectable()
export class ManagementService {

	constructor(private  client: HseHttpClient) { }

    getAddresses(): Observable<Address[]> {
        return this.client
            .get<Address[]>('/api/address/getAll');
    }
    getDepartments(): Observable<Department[]> {
        return this.client
            .get<Department[]>('/api/department/getAll');
    }
    getVolunteers(): Observable<Volunteer[]> {
        return this.client
            .get<Volunteer[]>('/api/volunteer/getAll');
    }
    getSubjects(): Observable<Subject[]> {
        return this.client
            .get<Subject[]>('/api/subject/getAll');
    }
}