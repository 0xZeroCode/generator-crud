
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import { get, set } from 'js-cookie';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { handleResponse, handleError } from './service-response-handler';

export const tokenName = 'accessToken';

export const orgInfoKey = 'organization';

export const authHeaderName = 'authorization';

export const loginUrl = '/um';

export function objectToRawString(object) {
  return Object.keys(object)
    .map(key => `${key}=${object[key]}`)
    .join('&');
}

export function promiseResult(observable: Observable<any>, self: Object): Promise<any> {
  return observable.toPromise()
    .then(response => {
      if (!response._body) return null;

      return response.json();
    })
    .then(result => {
      handleResponse(result);

      return result;
    })
    .catch(handleError.bind(self));
}

export function parseToken(jwt) {
  if (!jwt) return null;

  const payloadString = jwt.split('.')[1];

  const jsonString = Buffer.from(payloadString, 'base64').toString();

  return JSON.parse(jsonString);
}

export function getHeaders() {
  const headers: Headers = new Headers({ 'Content-Type': 'application/json' });

  if (get(tokenName)) {
    headers.set(authHeaderName, get(tokenName));
  }

  return headers;
}

export function isFirefox() {
  return navigator.userAgent.includes('Firefox');
}

export function clearFromNullOrEmpty(object) {
  const nonNullKeys = Object.keys(object).filter(key => {
    if (!object[key]) return false;

    return !!object[key].trim();
  });

  const result: any = {};

  nonNullKeys.forEach(key => {
    result[key] = object[key];
  });

  return trimFields(result);
}

export function trimFields(object) {
  const result = {};

  Object.keys(object).forEach(key => {
    result[key] = object[key].trim();
  });

  return result;
}

export function rangeFromStart(count) {
  return Array(count).fill(0).map((_, i) => i + 1);
}
