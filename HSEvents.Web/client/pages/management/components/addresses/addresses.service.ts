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

    get(id: number): Observable<Address> {
        return this.client
            .get<Address>(this.apiBase + 'get', id);
    }

    add(Address: Address): Observable<Address> {
        return this.client
            .put<Address>(this.apiBase + 'add', Address);
    }

    update(Address: Address): Observable<any> {
        return this.client
            .put<any>(this.apiBase + 'update', Address);
    }

    delete(id: number): Observable<any> {
        return this.client
            .post<any>(this.apiBase + 'delete', id);
    }
}