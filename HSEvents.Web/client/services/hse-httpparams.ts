import { HttpParams } from '@angular/common/http';

export class HseHttpParams {
    private httpParamsInner: HttpParams = new HttpParams();

    set(key: string, value: string) {
        if (value) {
            this.httpParamsInner = this.httpParamsInner.set(key, value);
        }

        return this;
    }

    get httpParams(): HttpParams {
        return this.httpParamsInner;
    }
}