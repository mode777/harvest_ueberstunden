import { Injectable } from '@angular/core';
import { HarvestService } from './harvest.service';
import { User } from '../models/user.model';
@Injectable()
export class UserService {

  user: User
  constructor(private harvest: HarvestService) {
  }


  async getUserId() {
    if(this.user === undefined){
      this.user =  await this.harvest.getUser(); 
    }
    return this.user.id;
  }

}
