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


}