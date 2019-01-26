import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HseHttpClient } from '../../../../services/hse-httpclient';
import { AcademicProgram } from '../../../../models/dictionaries.models';

@Injectable()
export class AcademicProgramService {

    private apiBase: string = '/api/academicProgram/';

    constructor(private client: HseHttpClient) { }

    getAll(): Observable<AcademicProgram[]> {
        return this.client
            .get<AcademicProgram[]>(this.apiBase + 'getAll');
    }

    get(id: number): Observable<AcademicProgram> {
        return this.client
            .get<AcademicProgram>(this.apiBase + 'get', id);
    }

    add(program: AcademicProgram): Observable<AcademicProgram> {
        return this.client
            .put<AcademicProgram>(this.apiBase + 'add', program);
    }

    update(program: AcademicProgram): Observable<any> {
        return this.client
            .put<any>(this.apiBase + 'update', program);
    }

    delete(id: number): Observable<any> {
        return this.client
            .post<any>(this.apiBase + 'delete', id);
    }

}