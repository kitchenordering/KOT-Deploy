import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ToastrService } from 'ngx-toastr';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  // @LocalStorage()
  public boundAttribute;
  public check = false;
  public check1 = false;
  public login: any = {};
  public log: any=[];
  public log1: any=[];
  constructor(private ngProgress: NgProgress,private toastr: ToastrService,private user: LoginService, private router: Router, private storage: LocalStorageService) { }

  ngOnInit() {
  }
  btnClick(param) {
    this.ngProgress.start();
    if(param.user=="" || param.passwor=="" || param.phone==""   ){
      this.toastr.success("Field is empty");
      this.ngProgress.done();

    }

    
    // var x =par;
var y = +param.phone; 
    // alert("one");
    let body = {
      "branch_id": param.user,
      "screen": "KOT",
      "login_status_id": 1,
      "mobile":y,
      "password": param.passwor
    }
    // alert("dwndnu");
    this.user.login(body).subscribe((Response: any) => {
      

      if (Response.ReturnCode == "LS") {
        this.storage.store("businessid", param.user);
       
      this.log = Response.branch_details[0].branch_name;
      this.storage.store("businessname",  this.log);
        
        
        
        this.toastr.success(this.log,"Login To");
        this.router.navigateByUrl('/user-profile');

        // alert("the testttttttt" +this.storage.retrieve("businessname"))
        this.ngProgress.done();
      }
      else {
         
        this.toastr.success("Please Enter The Correct Values");
        this.ngProgress.done();

      }
    });


    // this.router.navigateByUrl('/user-profile');


  }
}
