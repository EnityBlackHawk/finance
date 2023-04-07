import { Injectable } from '@angular/core';
import { User } from '../Models/User';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private _userId !: string;
  private _user !: User;


  constructor(
    private api: ApiService
  )
  {
  }

  public set userId(value: string)
  {
    this._userId = value;
  }

  public get userId(): string
  {
    return this._userId;
  }

}
