import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, RequestOptions,Headers, RequestMethod } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http:HttpClient,private https:Http) { }

Food_Orders(select){
    
    
 return this.http.post("https://tos-production.herokuapp.com/Query_today_food_orders",select)
}

Update(up){
 return this.http.post("https://tos-production.herokuapp.com/Update_Food_Order_Status_Item",up)
}

Serve(ser){
  console.log("resp")
  return this.http.post("https://tos-production.herokuapp.com/Update_Notification_Status",ser)
}
selectall(sele){
  console.log("resp")
  return this.http.post("https://tos-production.herokuapp.com/ServeAll_Food_Items",sele)
}
}
