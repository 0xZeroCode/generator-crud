import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { get } from 'js-cookie';

import { tokenName, loginUrl } from './utils';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (!get(tokenName)) {
      this.router.navigateByUrl(loginUrl);

      return false;
    }

    return true;
  }
}
