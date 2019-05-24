import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, RequestOptions,Headers, RequestMethod } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient,private https:Http) { }

  login(up){
    return this.http.post("https://tos-production.herokuapp.com/Billing_KOT_Login",up)
   }



}
