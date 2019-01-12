import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HseHttpClient } from '../../../../services/hse-httpclient';
import { Address } from '../../../../models/address.models';

@Injectable()
export class AddressService {

    private apiBase: string = '/api/address/';

    constructor(private client: HseHttpClient) { }

    getAll(): Observable<Address[]> {
        return this.client
            .get<Address[]>(this.apiBase + 'getAll');
    }
}