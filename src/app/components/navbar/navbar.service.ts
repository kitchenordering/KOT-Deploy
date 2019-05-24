import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, RequestOptions,Headers, RequestMethod } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(private http:HttpClient,private https:Http) { }
  Food_Orders(select){
    
    
    return this.http.post("https://tos-production.herokuapp.com/Query_today_food_orders",select)
   }
not_n(){
  let insert={}
 
return this.http.post("https://table-ordering-system.herokuapp.com/Query_today_food_orders",insert)
}

Notification(upl){
return this.http.post("https://tos-production.herokuapp.com/Query_Notification_Food_Items",upl)
}

Readed(read){
  return this.http.post("https://tos-production.herokuapp.com/Update_Notification_Status",read)
}

}