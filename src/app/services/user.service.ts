import { Injectable } from '@angular/core';
import { OAuthState } from './oauth.service';
import { UserInfo } from '../models/user.model';

@Injectable()
export class UserService {

  constructor() { }

  get isLoggedIn(){
    return !!this.oauthState.access_token;
  }

  get accountId() {
    const accounts = this.userInfo.accounts;
    return accounts ? accounts[0].id : 0;
  }

  get token(){
    return this.oauthState.access_token;
  }
  
  get oauthState(){
    return <OAuthState>JSON.parse(sessionStorage.getItem('oauth_state') || '{}');    
  }

  get userInfo(){
    return <UserInfo>JSON.parse(sessionStorage.getItem('user_info') || '{}');
  }

}
