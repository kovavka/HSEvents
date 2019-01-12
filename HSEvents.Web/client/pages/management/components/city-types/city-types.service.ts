import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HseHttpClient } from '../../../../services/hse-httpclient';
import { CityType } from '../../../../models/address.models';

@Injectable()
export class CityTypeService {

    private apiBase: string = '/api/cityType/';

    constructor(private client: HseHttpClient) { }

    getAll(): Observable<CityType[]> {
        return this.client
            .get<CityType[]>(this.apiBase + 'getAll');
    }
}