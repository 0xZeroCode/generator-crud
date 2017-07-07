import { Headers, Http, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Router } from '@angular/router';

import { objectToRawString, promiseResult, getHeaders } from '../utils';

@Injectable()
export class <%= serviceName %> {
  private baseUrl = '<%= baseUrl %>';

  constructor(private http: Http, private router: Router) {  }

  create<%= modelUpperName %>(<%= modelName %>): Promise<any> {
    return promiseResult(this.http.post(this.baseUrl, <%= modelName %>, {headers: getHeaders()}), this );
  }

  update<%= modelUpperName %>(<%= modelName %>): Promise<any> {
    const url = this.baseUrl + '/' + <%= modelName %>.id;

    return promiseResult(this.http.put(url, <%= modelName %>, {headers: getHeaders()}), this);
  }

  delete<%= modelUpperName %>(id): Promise<any> {
    const url = this.baseUrl + '/' + id;

    return promiseResult(this.http.delete(url, {headers: getHeaders()}), this);
  }

  getById(id): Promise<any> {
    const url = this.baseUrl + '/' + id;

    return promiseResult(this.http.get(url, {headers: getHeaders()}), this);
  }

  pagedSearch(query, pageNumber): Promise<any[]> {
    const url = this.baseUrl + '/pagedSearch';

    const entireQuery = pageNumber ? Object.assign({ pageNumber: pageNumber }, query) : query;

    const searchParams = new URLSearchParams(objectToRawString(entireQuery));

    return promiseResult(this.http.get(url, { search: searchParams, headers: getHeaders() }), this);
  }
}
