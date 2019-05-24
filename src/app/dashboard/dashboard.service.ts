import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Http, Response, RequestOptions,Headers, RequestMethod } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient,private https:Http) { }

  // Enable_Food(){
  //   let insert={}
  //   return this.http.get("https://table-ordering-system.herokuapp.com/Add_Food_Menu_Items",insert)
  // }
  Enable_Food(insert){
   
    return this.http.post("https://tos-production.herokuapp.com/Query_Food_Menu_Based_On_Branch",insert)
  }

  // Disable_Food(){
  //   let insert={}
  //   return this.http.get("https://table-ordering-system.herokuapp.com/Display_Disable_Food_Item",insert)
  // }

  Update(up){
    // console.log("ttttt",up)
    return this.http.post("https://tos-production.herokuapp.com/Edit_Food_Menu_Items",up)
  }
}
