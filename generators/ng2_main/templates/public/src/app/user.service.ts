import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';


import { tokenName, authHeaderName, promiseResult, getHeaders } from './utils';

@Injectable()
export class UserService {
  private headers: Headers = new Headers({ 'Content-Type': 'application/json' });

  private baseUrl = '/api/users';

  constructor(private http: Http, private router: Router) {
  }

  getMetadata() {
    const url = this.baseUrl + '/metadata';

    return promiseResult(this.http.get(url, { headers: getHeaders() }), this);
  }

  getServiceUsers() {
    const url = this.baseUrl + '/serviceusers';

    return promiseResult(this.http.get(url, { headers: getHeaders() }), this);
  }

  getServiceUsername() {
    return this.getMetadata()
      .then(metadata => metadata.serviceUser.username);
  }


}
