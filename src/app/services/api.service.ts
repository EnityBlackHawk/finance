import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../Models/Page';
import {User} from '../Models/User';
import { Entry } from '../Models/Entry';
import { Response } from '../Models/Response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiURL = "https://demo-1679408973898.azurewebsites.net/api/finance";
  private http;

  constructor(http: HttpClient) 
  { 
    this.http = http;
  }

  getAllUsers(): Observable<Page<User>>
  {
    return this.http.get<Page<User>>(this.apiURL + "/users/getAll");
  }

  getEntries(userId: String): Observable<Page<Entry>>
  {
    return this.http.get<Page<Entry>>(this.apiURL + "/entry/getByUser/" + userId);
  }

  getUser(id: string): Observable<Page<User>>
  {
    return this.http.get<Page<User>>(this.apiURL + "/users/getById/" + id);
  }

  autenticate(obj: any): Observable<Response<String>>
  {
    return this.http.post<Response<String>>(this.apiURL + "/users/doLogin", obj);
  }

  save(obj: any, userId: string): Observable<Entry>
  {
    console.log(this.apiURL + "/entry/add/" + userId);
    return this.http.post<Entry>(this.apiURL + "/entry/add/" + userId, obj);
  }



}
