import { OauthService } from '../services/oauth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public auth: OauthService, public router: Router) {}

  async canActivate(): Promise<boolean> {
    await this.auth.tryLogin();
    return true;
  }
}
