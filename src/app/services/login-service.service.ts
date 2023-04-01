import { Injectable } from '@angular/core';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  public userId !: string;
  public user !: User;
  constructor() { }



}
