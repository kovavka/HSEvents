import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HseHttpClient } from '../../services/hse-httpclient';
import Usermodels = require("../../models/user.models");
import AttendeeDto = Usermodels.AttendeeDto;

@Injectable()
export class AttendeeService {

    private apiBase: string = '/api/attendee/';

    constructor(private client: HseHttpClient) { }

    getAll(): Observable<AttendeeDto[]> {
        return this.client
            .get<AttendeeDto[]>(this.apiBase + 'getAll');
    }

    getAllByEvent(eventId: number): Observable<AttendeeDto[]> {
        return this.client
            .get<AttendeeDto[]>(this.apiBase + 'GetAllByEvent?eventId=' + eventId);
    }
    
    add(attendee: AttendeeDto): Observable<any> {
        return this.client
            .put<any>(this.apiBase + 'add', attendee);
    }

    update(attendee: AttendeeDto): Observable<any> {
        return this.client
            .put<any>(this.apiBase + 'update', attendee);
    }

    delete(id: number): Observable<any> {
        return this.client
            .post<any>(this.apiBase + 'delete', id);
    }
}