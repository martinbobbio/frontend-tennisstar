import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../../services/home.service';

import * as swal from 'sweetalert2';

declare let $: any;

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications;
  mobile = false;
  isAdmin;

  constructor(public homeService:HomeService, public router:Router) { }

  ngOnInit() {

    this.isAdmin = localStorage.getItem("isAdmin");
    var isMobile = window.matchMedia("only screen and (max-width: 576px)");
    if (isMobile.matches) {
        this.mobile = true;
    }

    if(this.isAdmin != 1){
      this.router.navigate(['/']);
    }

    this.homeService.getNotifications().subscribe(data =>{
      this.notifications = data.data[0];

      setTimeout(function() {
        $(document).ready(function() {
          $('select').material_select();
        });
      }, 1000);

      this.setValues(this.notifications);
      
    });


  }

  viewInfo(){

    let textHtml = `
    <div class="row">

      <p class="bold">Acciones</p>
      <div class="col s12 m12">
        <div style="background: #43A047;padding:7px;color:white;margin-top:15px;">Accíon de agregado</div>
      </div>
      <div class="col s12 m12">
        <div style="background: #0288d1;padding:7px;color:white;margin-top:15px;">Accíon de edición</div>
      </div>
      <div class="col s12 m12 style="margin-bottom:35px;">
        <div style="background: #e53935;padding:7px;color:white;margin-top:15px;">Accíon de eliminación</div>
      </div>

      <div style="margin-top:20px;" class="col s12 m12 left-align">
        <p class="center-align bold">Entidades</p>
      </div>
      <div class="col s12 m6 left-align">
        <i class="material-icons background-round mt-5">account_circle</i> Usuarios (cuenta)
      </div>
      <div class="col s12 m6 left-align">
        <i class="material-icons background-round mt-5">account_box</i> Usuarios (datos)
      </div>
      <div class="col s12 m6 left-align">
        <i class="material-icons background-round mt-5">donut_small</i> Usuarios (habilidades)
      </div>
      <div class="col s12 m6 left-align">
        <i class="material-icons background-round mt-5">new_releases</i> Noticias
      </div>
      <div class="col s12 m6 left-align">
        <i class="material-icons background-round mt-5">event</i> Partidos
      </div>
      <div class="col s12 m6 left-align">
        <i class="material-icons background-round mt-5">star</i> Torneos
      </div>
      <div class="col s12 m6 left-align">
        <i class="material-icons background-round mt-5">person_add</i> Solicitud amistad
      </div>
      <div class="col s12 m6 left-align">
        <i class="material-icons background-round mt-5">record_voice_over</i> Solicitud partido
      </div>
      <div class="col s12 m6 left-align">
        <i class="material-icons background-round mt-5">place</i> Club favorito
      </div>

      
      <div style="margin-top:20px;" class="col s12 m12 left-align">
        <p class="center-align bold">Entornos</p>
        <div style="padding:7px;margin-top:15px;">Backend: <a href="https://admin-tenis.tennis-star.com">Panel de admin</a></div>
      </div>
      <div class="col s12 m12 left-align">
        <div style="padding:7px;margin-top:15px;">Frontend: <a href="https://www.tennis-star.com/explorar">TennisStar</a></div>
      </div>

      
      

    </div>
    `

    swal({
      title: "Referencias", 
      html: textHtml,  
      showConfirmButton: false,
      showCloseButton: true
    });

  }

  filter(){

    let action = $(".action")[1]["value"];
    let entity = $(".entity")[1]["value"];
    let environment = $(".environment")[1]["value"];

    $("#notifications").fadeOut();
    $("#loader").fadeIn();

    this.homeService.getNotificationsBy(action,entity,environment).subscribe(
      (response)=>{

        $("#loader").fadeOut();
        $("#notifications").fadeIn();

        this.notifications=response.data[0];
        this.setValues(this.notifications);
      })
    
  }

  setValues(notifications){
    for(let n of this.notifications){

      if(n["entity"] == "user"){
        n["entity"] = "account_circle";
      }
      if(n["entity"] == "playerUser"){
        n["entity"] = "account_box";
      }
      if(n["entity"] == "skillUser"){
        n["entity"] = "donut_small";
      }
      if(n["entity"] == "notice"){
        n["entity"] = "new_releases";
      }
      if(n["entity"] == "match"){
        n["entity"] = "event";
      }
      if(n["entity"] == "tournament"){
        n["entity"] = "stars";
      }
      if(n["entity"] == "requestFriend"){
        n["entity"] = "person_add";
      }
      if(n["entity"] == "requestMatch"){
        n["entity"] = "record_voice_over";
      }
      if(n["entity"] == "clubFavorite"){
        n["entity"] = "place";
      }
    }
  }

}
