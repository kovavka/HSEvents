import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class HseHttpClient {
	constructor(
		protected http: HttpClient
	) {
	}

    get<T>(url: string, params?: HttpParams | { }): Observable<T> {
        return this.http
            .get<T>(url, { headers: this.createHeaders(), params: params })
            .pipe(
                catchError((err: any) => {
                    return this.handleError(err);
                })
            );
    }


	put<T>(url: string, body: any | null): Observable<T> {
		return this.http
			.put<T>(url, body)
			.pipe(
				catchError((err: any) => {
					return this.handleError(err);
				})
			);
	}

	post<T>(url: string, body?: any | null): Observable<T> {
		return this.http
			.post<T>(url, body)
			.pipe(
				tap((response: T) => {
				}),
				catchError((err: any) => {
					return this.handleError(err);
				})
			);
	}


	private handleError(error: any): ErrorObservable {
		console.log(error);

		if (error.error instanceof ErrorEvent) {
			console.error('Error: ', error.error.message);
		} else {
			console.error(
				`Error status ${error.status}, ` +
				`error: ${JSON.stringify(error.error)}`);
		}

		return error;
    }

    private createHeaders() {
        return new HttpHeaders()
            .set('Content-Type', 'application/json'); //Todo: здесь ещё нужно будет прописать authorization
    }
}