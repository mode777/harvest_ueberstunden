import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Session } from 'protractor';
import { HarvestService } from './harvest.service';
import { UserInfo } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

export interface OAuthState {
  access_token: string,
  expires_in: string,
  scope: string,
  token_type: string
}

@Injectable()
export class OauthService {
  
  private userurl = 'https://id.getharvest.com/api/v2/accounts'; 

  constructor(private http: HttpClient, private user: UserService) { 
    
  }

  private startImplicitFlow(){
    location.replace(`https://id.getharvest.com/oauth2/authorize?client_id=${environment.clientId}&response_type=token&scope=${environment.scope}`)
  }

  private parseQuery() {
    const queryString = window.location.search.substring(1);
    const query = {};
    const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
  }

  async tryLogin(){
    const params = this.parseQuery();

    if(!this.user.isLoggedIn){
      if(params['access_token']){
        sessionStorage.setItem('oauth_state', JSON.stringify(params));
        const info = await this.getUserInfo();        
        sessionStorage.setItem('user_info', JSON.stringify(info));
        window.location.replace(window.location.origin);
      }
      else {
        this.startImplicitFlow();
      }
    }
  }

  async getUserInfo(){
    return await <UserInfo><any>this.http.get(this.userurl).toPromise();
  }

}
