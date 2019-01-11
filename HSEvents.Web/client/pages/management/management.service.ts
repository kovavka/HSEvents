import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HseHttpClient } from '../../services/hse-httpclient';

@Injectable()
export class ManagementService {

	constructor(private  client: HseHttpClient) { }

}