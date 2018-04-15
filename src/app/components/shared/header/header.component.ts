import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { environment } from '../../../../environments/environment';
import { RequestFriendService } from '../../../services/request-friend.service';

import * as swal from 'sweetalert2';
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
  requestFriendsHtml:string = "";

  friends:any[];

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

  openRequests(){
    
    if(this.requestFriends.length != 0){
      $("#btn-request").removeClass("red-text");
      swal({
        title: "Solicitudes de amistad", 
        html: this.requestFriendsHtml,  
        confirmButtonText: "Volver", 
        confirmButtonColor: "#ff9800"
      });

      let this_aux = this;

      $(document).on('click', ".acceptRequest", function() {
        this_aux.requestFriendService.sendResponseFriend(this.id,1).subscribe(
          (response)=>{
            this_aux.requestFriendsHtml = "";
            this_aux.chargueRequests();
            swal.close();
          });

      });

      $(document).on('click', ".declineRequest", function() {
        this_aux.requestFriendService.sendResponseFriend(this.id,0).subscribe(
          (response)=>{
            swal.close();
          });
      });

      $(document).on('click', ".goProfile", function() {
        window.location.href = "/profile/"+this.id;
      });

    }else{
      swal({
        text: "Aún no tienes solicitudes de amistad", 
        confirmButtonText: "Volver", 
        confirmButtonColor: "#ff9800"
      });
    }
  }

  viewFriends(){

    let this_aux = this;

    this.requestFriendService.getFriends().subscribe(
      (response)=>{

        this.friends = response.data[0];
        let textHtml = "";

        for (let f of this.friends) {
          textHtml += `
          <ul class="collection">
          <li class="collection-item avatar">
            <img id="${f.id_user}" src="${this.path}${f.path}" alt="" class="circle pointer goProfile">
            <p id="${f.id_user}" class="bold left-align goProfile pointer">${f.firstname} ${f.lastname}</p>
            <br>
            <p class="left-align">${f.gameLevel} - ${f.gameStyle}
            </p>
            <a id="${f.id}" class="secondary-content removeFriend pointer red-text"><i class="material-icons">delete</i></a>
          </li>
        </ul>
          `
        }
        if(textHtml == ""){
          textHtml = "Aún no tienes amigos, agrega a jugadores similares a tu juego"
        }
        swal({
          title: "Amigos", 
          html: textHtml,  
          confirmButtonText: "Volver", 
          confirmButtonColor: "#ff9800"
        });
      });

      $(document).on('click', ".removeFriend", function() {
        this_aux.requestFriendService.sendResponseFriend(this.id,0).subscribe(
          (response)=>{
            swal.close();
            swal({
              title: "Usuario borrado", 
              confirmButtonText: "Volver",
              confirmButtonColor: "#ff9800",
              type: "success"
            });
          });
      });

      $(document).on('click', ".goProfile", function() {
        window.location.href = "/profile/"+this.id;
      });
  }

  

  constructor(public auth:AuthService,public userService:UserService, public requestFriendService:RequestFriendService, public router:Router) {
    auth.handleAuthentication();
  }

  ngOnInit() {

    this.chargueRequests()

    this.isNewUser = localStorage.getItem("new_user");
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

  chargueRequests(){
    this.requestFriendService.getRequests().subscribe(
      (response)=>{
          
          this.requestFriends = response.data[0];
          let this_aux = this;

          if(this.requestFriends.length != 0){
            $("#btn-request").addClass("red-text");
            for (let rf of this.requestFriends) {
              this.requestFriendsHtml += `
              <div class="card green">
              <div class="card-content left-align white-text">
                <span id="${rf.id_user}" class="card-title pointer goProfile">${rf.username}</span>
                <br>
                <div class="row">
                  <div class="col s3 left-align ">
                    <img id="${rf.id_user}" src="${this_aux.path}${rf.path}" alt="" class="circle pointer goProfile">
                  </div>
                  <div class="col s9 left-align ">
                    <p id="${rf.id_user}" class="pointer goProfile">${rf.firstname} ${rf.lastname}</p>
                    <p style="margin-top:15px;">${rf.gameLevel} - ${rf.gameStyle}</p>
                  </div>
                </div>
              </div>
              <div class="card-action white">
                <a id="${rf.id}" class="acceptRequest green-text pointer">Aceptar</a>
                <a id="${rf.id}" class="declineRequest red-text pointer">Rechazar</a>
              </div>
            </div>
              `
              console.log(rf);
            }
          }

          return;
      })
  }

  logout(){
    this.auth.logout();
    location.reload();
  }

}
