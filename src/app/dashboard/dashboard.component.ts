import { Component, OnInit } from '@angular/core';
import {DashboardService} from './dashboard.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[DashboardService]
})
export class DashboardComponent implements OnInit {
  public enable:any=[];
  public disable:any=[];
  public open=[];close=[];
  public Toggle=false;
  public timeint

  constructor( private ngProgress: NgProgress,private dash:DashboardService,private router:Router,private toastr: ToastrService,private storage: LocalStorageService) { }
  ngOnInit() {  
    this.Enable_Food();
    this.timeint=setInterval(()=>this.Enable_Food(),5000);
    // this.Disable_Food();
  }
  ngOnDestroy(){
    clearInterval(this.timeint);
  }

  Enable_Food(){
    // alert("the testttttttt" +this.storage.retrieve("businessid"))
    
      // alert("one");
      let body={  
        "branch_id":this.storage.retrieve("businessid")
      }
    this.dash.Enable_Food(body).subscribe((Response:any)=>{
      if(Response.ReturnCode=="RRS"){
        this.enable=Response.Returnvalue;
        this.open=[];this.close=[];
        for(var i=0;i<this.enable.length;i++){
         if(this.enable[i].food_status_id=="1"){
           this.open.push(this.enable[i])
          //  console.log(this.open)
         }
         else{
           this.close.push(this.enable[i])
         }
        }
        
        // console.log("close",this.close)
      }
      
  });
}




togglebutton(param){
  this.ngProgress.start();
  // alert("the testttttttt" +this.storage.retrieve("businessname"))
  if(param.food_status_id==1){
    let body={
      "food_name":param.food_name,
      "price":param.price,
      "food_id":param.food_id,
      "item_category_id":param.item_category_id,
      "image_url":"",
      "food_status_id":2, 
      "food_description":"",
      "food_id_url":"",
      "food_type_id":param.food_type_id,
      "offer_value":param.offer_value,
      "branch_name":this.storage.retrieve("businessname"),
      "category":param.category
    }
    this.dash.Update(body).subscribe((Response:any)=>{
      if(Response.ReturnCode=="RUS"){
        this.toastr.success('disabled');
        this.ngProgress.done();
   
        // alert(Response.Return);
  this.Enable_Food();
  }
  });

  }else{
    let body={
      "food_name":param.food_name,
      "price":param.price,
      "food_id":param.food_id,
      "item_category_id":param.item_category_id,
      "image_url":"",
      "food_status_id":1, 
      "food_description":"",
      "food_id_url":"",
      "food_type_id":param.food_type_id,
      "offer_value":param.offer_value,
      "branch_name":this.storage.retrieve("businessname"),
      "category":param.category
    }
    this.dash.Update(body).subscribe((Response:any)=>{
      if(Response.ReturnCode=="RUS"){
        this.toastr.success('enabled');
        this.ngProgress.done();
  this.Enable_Food();
  }
  });
  
  }
  
}
star(){
  
}
}