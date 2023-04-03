import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, RepeatConfig } from 'rxjs';
import { Page } from '../Models/Page';
import {User} from '../Models/User';
import { Entry } from '../Models/Entry';
import { Response } from '../Models/Response';
import {enviroment} from '../../'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // https://demo-1679408973898.azurewebsites.net
  private readonly apiURL =  "https://demo-1679408973898.azurewebsites.net/api/finance";
  private http;

  constructor(http: HttpClient) 
  { 
    this.http = http;
  }

  getStatus(): Observable<Response<String>>
  {
    return this.http.get<Response<String>>(this.apiURL);
  }

  private getAllUsers(): Observable<Page<User>>
  {
    return this.http.get<Page<User>>(this.apiURL + "/users/getAll");
  }

  getEntries(userId: String): Observable<Response<Page<Entry>>>
  {
    return this.http.get<Response<Page<Entry>>>(this.apiURL + "/entry/getByUser/" + userId);
  }

  getUser(id: string): Observable<Response<Page<User>>>
  {
    return this.http.get<Response<Page<User>>>(this.apiURL + "/users/getById/" + id);
  }

  autenticate(obj: any): Observable<Response<String>>
  {
    return this.http.post<Response<String>>(this.apiURL + "/users/doLogin", obj);
  }

  save(obj: any, userId: string): Observable<Response<Entry>>
  {
    console.log(this.apiURL + "/entry/add/" + userId);
    return this.http.post<Response<Entry>>(this.apiURL + "/entry/add/" + userId, obj);
  }

  deleteEntry(entryId: String, userToken: String): Observable<Response<User>>
  {
    let r = new Response<String>(entryId, 0, "");
    return this.http.post<Response<User>>(this.apiURL + "/entry/remove/" + userToken, r);
  }

}
