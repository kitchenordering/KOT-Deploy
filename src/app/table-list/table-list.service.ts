import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, RequestOptions,Headers, RequestMethod } from '@angular/http';

@Injectable({
 providedIn: 'root'
})
export class TableListService {

 constructor(private http:HttpClient,private https:Http) { }


Food_Orders(insert){
    
 return this.http.post("https://tos-production.herokuapp.com/Query_food_orders_waiter",insert)
}
}