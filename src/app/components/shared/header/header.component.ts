import { Component, OnInit } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { environment } from '../../../../environments/environment';
import { RequestFriendService } from '../../../services/request-friend.service';

declare let $: any;

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
  
  pathImg:string;
  path:string = environment.backPathImage;

  requestFriends:any[];

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

  constructor(public auth:AuthService,public userService:UserService, public requestFriendService:RequestFriendService) {
    auth.handleAuthentication();
  }

  ngOnInit() {
    
    this.requestFriendService.getRequests().subscribe(
      (response)=>{
          
          this.requestFriends = response.data[0];
          console.log(this.requestFriends);

          if(this.requestFriends[0]){
            $("#btn-request").addClass("red-text");
          }
          
          return;
      })

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


    if(Number(localStorage.getItem("id_user")) != 0){
    this.userService.getImageProfile(Number(localStorage.getItem("id_user"))).subscribe(
      (response)=>{
        this.pathImg = response.data[0]["path"];
      })
    }
    

  }

  logout(){
    this.auth.logout();
    location.reload();
  }

}
