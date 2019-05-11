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

    add(address: Address): Observable<Address> {
        return this.client
            .put<Address>(this.apiBase + 'add', address);
    }

    update(address: Address): Observable<any> {
        return this.client
            .put<any>(this.apiBase + 'update', address);
    }

    delete(id: number): Observable<any> {
        return this.client
            .post<any>(this.apiBase + 'delete', id);
    }

    deleteSeveral(ids: number[]): Observable<any> {
        return this.client
            .post<any>(this.apiBase + 'deleteSeveral', ids);
    }
}