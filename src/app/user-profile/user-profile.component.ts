import { Component, OnInit } from '@angular/core';
import { UserProfileService } from './user-profile.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { NgProgress } from 'ngx-progressbar';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers:[UserProfileService]
})
export class UserProfileComponent implements OnInit {
public food:any=[];
public food1:any=[];
public food2:any=[];
public food3:any=[];

public foods:any=[];
public list:any=[];
public list2:any=[];
public notify: any = [];
public notify1: any = [];
  public orderdetid: any = [];

  public final: any=[];
  public final1: any=[];

  public check=true;
  public check1=false;
  public status:any;
  public read=[];unread=[];
  buttonDisabled: boolean = true;
  select(){}

    

  constructor(private ngProgress: NgProgress,private user:UserProfileService,private toastr: ToastrService,private storage: LocalStorageService) { }
public timeint;
  ngOnInit() {
    this.Food_Orderss();
this.timeint=setInterval(()=>this.Food_Orderss(),5000);
   
   
  }
  ngOnDestroy(){
    clearInterval(this.timeint);
  }


  Food_Orderss(){
    let body={  
      "branch_id":this.storage.retrieve("businessid")
    }
    this.user.Food_Orders(body).subscribe((Response:any)=>{
      if(Response.ReturnCode=="RRS"){
        // alert("the testttttttt" +this.storage.retrieve("businessid"))
        this.food=Response.Returnvalue;
       
        // console.log("nkmkc",this.food)
        // for (var i = 0; i < this.notify.length; i++) {
        //   for (var k = 0; k < this.notify[i].all_items.length; k++) {
        //     for (var j = 0; j < this.notify[i].all_items[k].items.length; j++) {
        //       this.orderdetid.push(this.notify[i].all_items[k].items[j].order_details_id)
        //     }
        //   }
        // } console.log("vvvvvvvvvv", this.orderdetid);
      }

    });
  }





 
togglebutton(param){
  this.ngProgress.start();
  this.list=param;
  this.list2 .push (this.list.order_details_id)
  // console.log("list2", this.list2)

 
    

if(param.order_status_id==5){
  let body={
      "order_details_id":param.order_details_id,
      "order_status_id":6,
      "branch_id":this.storage.retrieve("businessid")
  }
  this.user.Update(body).subscribe((Response:any)=>{
    if(Response.ReturnCode=="RUS"){
      
      this.Food_Orderss()
      this.toastr.success('FOOD COOKED');
    }
  });






  
  
}

}

//


Serve(par){
  
 
  // let body={
  //   "notification_status_id":2,
  //   "order_details_id":this.list2
  // }
  // console.log("body",body)
  // this.user.Serve(body).subscribe((Response:any)=>{
  //   if(Response.ReturnCode=="RUS"){
     
  //  this.list2=[];
  //  this.toastr.success('Notification to Bearer is Successful');
  //   }
  // });
  let body={  
    "branch_id":this.storage.retrieve("businessid")
  }
  this.user.Food_Orders(body).subscribe((Response:any)=>{
    if(Response.ReturnCode=="RRS"){
       this.notify1=Response.Returnvalue;
      //  console.log("notif1y",  this.notify1) 
       
        //var filtered = this.notify.filter();  
        for (var i = 0; i < this.notify1.length; i++) {
            // console.log("for loop",this.notify1[i])
            if (this.notify1[i]['table_no'] == par.table_no){
                var all_items2 = this.notify1[i]['all_items']
        
                // console.log("all_items",all_items2)
                for (var j = 0; j < all_items2.length; j++){
                    var ar_items2 =  all_items2[j]['items']
                    // console.log("ar_items",ar_items2)
                    for (var k = 0; k < ar_items2.length; k++){
                        
                        if (ar_items2[k]['order_status_id']==6 && ar_items2[k]['notification_status_id']==3){
                         this.final1.push(ar_items2[k]['order_details_id'])
                        }
                        
                        
                    }
                }
                
            }
        } 
       
       
      
    }
    if(this.final1 == ""){
      this.ngProgress.start();
      
      this.toastr.success('No Items Has Been Cooked');
      this.ngProgress.done();
    
     }
     
 
 
    let body={
        "notification_status_id":2,
        "order_details_id":this.final1,
        "branch_id":this.storage.retrieve("businessid")
      }
      // console.log("body",body)
      this.user.Serve(body).subscribe((Response:any)=>{
        if(Response.ReturnCode=="RUS"){
         
      
       this.toastr.success('Notification To Bearer Is Successful');
        }
  });

  });
  // console.log('repoer',this.final1);
  // alert(this.final1);
  
  this.final1=[];

  this.ngProgress.done();
  this.Food_Orderss()
  
}

Serveall(item){
  this.ngProgress.start();
  let body={  
    "branch_id":this.storage.retrieve("businessid")
  }
  this.user.Food_Orders(body).subscribe((Response:any)=>{
    if(Response.ReturnCode=="RRS"){
       this.notify=Response.Returnvalue;
      //  console.log("notify",  this.notify) 
       
        //var filtered = this.notify.filter();  
        for (var i = 0; i < this.notify.length; i++) {
            // console.log("for loop",this.notify[i])
            if (this.notify[i]['table_no'] == item.table_no){
                var all_items1 = this.notify[i]['all_items']
        
                // console.log("all_items",all_items1)
                for (var j = 0; j < all_items1.length; j++){
                    var ar_items =  all_items1[j]['items']
                    // console.log("ar_items",ar_items)
                    for (var k = 0; k < ar_items.length; k++){
                        
                        if (ar_items[k]['order_status_id']==5  ){
                         this.final.push(ar_items[k]['order_details_id'])
                        }
                        
                        
                    }
                }
                
            }
        } 
       
       
      
    }
    // alert(this.final)
 this.orderdetid=[];
 if(this.final == ""){
  this.ngProgress.done();
  this.toastr.success('No Items Has Been Cooked');

 }
 
  let body={
    
    "order_details_id":this.final
  }
  
  // console.log("body",body)
  this.user.selectall(body).subscribe((Response:any)=>{
    if(Response.ReturnCode=="RUS"){
      this.ngProgress.done();
   
   this.toastr.success('Notification To Bearer Is Successful');
    }
  });

  });
  
  
  this.final=[];
  this.Food_Orderss()
  

}




}



  
      // for (var i = 0; i < this.notify.length; i++) {
      //   for (var k = 0; k < this.notify[i].all_items.length; k++) {
      //     for (var j = 0; j < this.notify[i].all_items[k].items.length; j++) {
      //       this.orderdetid.push(this.notify[i].all_items[k].items[j].order_details_id)
       //   }
      //  }
      // } console.log("vvvvvvvvvv", this.orderdetid);