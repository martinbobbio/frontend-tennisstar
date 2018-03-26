import { Component, OnInit } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AuthService } from '../../../services/auth.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  openMenu:boolean = false;
  profile:any[];
  username:string;

  isNewUser;
  mobile = false;

  openAside(){
    if(!this.openMenu){
      $(".sidebar-left-collapse").fadeIn();
      this.openMenu = true;
    }
    else if(this.openMenu){
      $(".sidebar-left-collapse").fadeOut();
      this.openMenu = false;
      }
  }

  constructor(public auth:AuthService) {
    auth.handleAuthentication();
  }

  ngOnInit() {

    this.isNewUser = localStorage.getItem("new_user")

    var isMobile = window.matchMedia("only screen and (max-width: 576px)");
    if (isMobile.matches) {
        this.mobile = true;
    }

    this.username = localStorage.getItem("username");
    var links = $('.links');
    
    links.on('click', function () {

      links.removeClass('selected');
      $(this).addClass('selected');

    });

    
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      if(this.auth.isAuthenticated()){
        this.auth.getProfile((err, profile) => {
          this.profile = profile;
        });
      }
    }


    

  }

  logout(){
    this.auth.logout();
    location.reload();
  }

}
