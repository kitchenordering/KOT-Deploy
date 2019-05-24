import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarService } from './navbar.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [NavbarService]
})
export class NavbarComponent implements OnInit {
  panelExpanded = false;
  public food: any = [];
  public not: any = [];
  public count: any = [];
  public count2: any = [];
  public notify: any = [];
  public notify1: any = [];
  public orderdetid: any = [];


  private listTitles: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;

  constructor(private ngProgress: NgProgress,location: Location, private element: ElementRef,private toastr: ToastrService, private router: Router, private nav: NavbarService, private storage: LocalStorageService) {
    this.location = location;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.Food_Orders();
    this.Serve();

     setInterval(()=>this.Food_Orders(),5000);
     setInterval(()=>this.Serve(),5000);
    // 

    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
      var $layer: any = document.getElementsByClassName('close-layer')[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    body.classList.add('nav-open');

    this.sidebarVisible = true;
  };
  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    body.classList.remove('nav-open');
  };
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    var $toggle = document.getElementsByClassName('navbar-toggler')[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const body = document.getElementsByTagName('body')[0];

    if (this.mobile_menu_visible == 1) {
      // $('html').removeClass('nav-open');
      body.classList.remove('nav-open');
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function () {
        $toggle.classList.remove('toggled');
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function () {
        $toggle.classList.add('toggled');
      }, 430);

      var $layer = document.createElement('div');
      $layer.setAttribute('class', 'close-layer');


      if (body.querySelectorAll('.main-panel')) {
        document.getElementsByClassName('main-panel')[0].appendChild($layer);
      } else if (body.classList.contains('off-canvas-sidebar')) {
        document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
      }

      setTimeout(function () {
        $layer.classList.add('visible');
      }, 100);

      $layer.onclick = function () { //asign a function
        body.classList.remove('nav-open');
        this.mobile_menu_visible = 0;
        $layer.classList.remove('visible');
        setTimeout(function () {
          $layer.remove();
          $toggle.classList.remove('toggled');
        }, 400);
      }.bind(this);

      body.classList.add('nav-open');
      this.mobile_menu_visible = 1;

    }
  };

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(2);
    }
    titlee = titlee.split('/').pop();

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'BUHARI KITCHEN';
  }
  btnClick() {
    this.router.navigateByUrl('/dashboard');
  };
  btnClick1() {
    this.router.navigateByUrl('/user-profile');
  };
  btnClick2() {
    this.router.navigateByUrl('/table-list');
  };
  btnClick3() {
    this.router.navigateByUrl('/login');
  };


  Food_Orders() {
    let body={  
      "branch_id":this.storage.retrieve("businessid")
    }
    this.nav.Food_Orders(body).subscribe((Response: any) => {
      if (Response.ReturnCode == "RRS") {
        this.food = Response.Returnvalue;
        this.count = Response.order_status_count;
      }

    });
  }
  not_n() {
    this.nav.not_n().subscribe((Response: any) => {
      if (Response.ReturnCode == "RRS") {
        this.not = Response.Returnvalue;

      }

    });
  }

  
  Serve() {
    let body= {
      "branch_id":this.storage.retrieve("businessid")

    } 
    this.nav.Notification(body).subscribe((Response: any) => {
      if (Response.ReturnCode == "RRS") {
        this.notify = Response.Returnvalue;
        this.count2 = Response.Notification_Count;
        // console.log(this.notify)
        // for (var i = 0; i < this.notify.length; i++) {
          
        //     for (var j = 0; j < this.notify[i].items.length; j++) {
        //       this.orderdetid.push(this.notify[i].items[j].order_details_id)
        //     }
        //   }
        // }
        //  console.log("vvvvvvvvvv", this.orderdetid);
    
      }
    });
  }

  Readed(key) {
    // this.ngProgress.start();
    // alert(this.orderdetid)
    let body1= {
      "branch_id":this.storage.retrieve("businessid")

    } 
    this.nav.Notification(body1).subscribe((Response: any) => {
      if (Response.ReturnCode == "RRS") {
        this.notify1 = Response.Returnvalue;
        this.count2 = Response.Notification_Count;
        // console.log(this.notify)
        for (var i = 0; i < this.notify1.length; i++) {
          if (this.notify[i]['table_no'] == key.table_no){
            var all_items1 = this.notify[i]['items']
          
            for (var j = 0; j < all_items1.length; j++) {
              this.orderdetid.push(all_items1[j]['order_details_id'])
            }
          }
        }
      }
      let body = {
        "notification_status_id": 1,
        "order_details_id": this.orderdetid ,
        "branch_id":this.storage.retrieve("businessid")
      }
     
      // console.log("jhbjk",body)
      this.nav.Readed(body).subscribe((Response: any) => {
        if (Response.ReturnCode == "RUS") {
          this.toastr.success('Thank You For Serving The Food');
          this.Serve();
        }
       
   
  });
    });
        // alert(this.orderdetid)
        
        //  console.log("vvvvvvvvvv", this.orderdetid);
        
    
   
   
    this.orderdetid = []
    // this.ngProgress.done();
  }

  cli(){
    if(this.count2==0){
      this.toastr.success('No Notification to Show');


    }
  }
  

}
