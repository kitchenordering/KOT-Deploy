import { Component, OnInit, ɵConsole } from '@angular/core';
import { TableListService} from './table-list.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
// import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
  providers:[TableListService]
})
export class TableListComponent implements OnInit {
  public food:any=[];

  public check=true;
  public check1=false;
  public status:any;
  buttonDisabled: boolean = true;
  select(){}
  

  constructor(private router:Router,private table:TableListService,private storage: LocalStorageService) { }
  public timeint;
  ngOnInit() {
   this.Food_Orderss();
   this.timeint=setInterval(()=>this.Food_Orderss(),5000);
  }
  ngOnDestroy(){
    clearInterval(this.timeint);
  }
 
  toggle1(fod){
    this.status=fod.fd;
    if(this.status=="cooked"){
      this.check=false;
      this.check1=true;

    }
    else{
      this.check=true;
      this.check1=false;
    }

  }


  Food_Orderss(){
    let body={  
      "branch_id":this.storage.retrieve("businessid")
    }
    this.table.Food_Orders(body).subscribe((Response:any)=>{
      this.food=Response.Returnvalue;
      // console.log("foodssss",this.food)

    });
  }
}

