import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RequestFriendService } from '../../services/request-friend.service';
import { RequestMatchService } from '../../services/request-match.service';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { forEach } from '@angular/router/src/utils/collection';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as swal from 'sweetalert2';

declare let $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  //Responsive status
  mobile:boolean = false;

  //Chart
  radarChartLabels:string[] = ['Drive', 'Réves', 'Servicio', 'Volea', 'Resistencia'];
  radarChartData:any;
  radarChartType:string = 'radar';

  //User
  user;
  user_aux;
  user_id:number;
  compareUser:boolean = false;
  isFriend:boolean = false;
  isRequestFriend:boolean = false;
  isRequestFriendMsg:string;
  isRequestMatch:boolean = false;
  isRequestMatchMsg:string;

  //Form
  formMatch:FormGroup;
  
  //Path
  path:string = environment.backPathImage;

  constructor(public userService:UserService,public route:Router, public router:ActivatedRoute, public requestMatchService:RequestMatchService, public requestFriendService:RequestFriendService, public sanitizer:DomSanitizer) {

    this.formMatch = new FormGroup({
      'title': new FormControl('',Validators.required),
      'date': new FormControl(),
      'hour': new FormControl(),
    });

  }

  ngOnInit() {

    $(document).ready(function() {
      $('select').material_select();
      $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        today: 'Today',
        clear: 'Clear',
        close: 'Ok',
        format: 'yyyy-mm-dd',
        closeOnSelect: false // Close upon selecting a date,
      });
      $('.timepicker').pickatime({
        default: 'now', // Set default time: 'now', '1:30AM', '16:30'
        fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
        twelvehour: false, // Use AM/PM or 24-hour format
        donetext: 'OK', // text for done-button
        cleartext: 'Clear', // text for clear-button
        canceltext: 'Cancel', // Text for cancel-button
        autoclose: false, // automatic close timepicker
        ampmclickable: true, // make AM PM clickable
        aftershow: function(){} //Function for after opening timepicker
      });
    });

    var isMobile = window.matchMedia("only screen and (max-width: 576px)");
    if (isMobile.matches) {
        this.mobile = true;
    }
    this.router.params.forEach((params: Params) => {
      if(params['id']){
        this.user_id = params['id'];
        this.compareUser = true;
      }else{
        this.user_id = Number(localStorage.getItem("id_user"));
      }
    })

    this.userService.getProfile(this.user_id).subscribe(
      (response)=>{
        this.user = response.data[0];
        if(this.user.friends){
          this.user.friends.forEach(friend => {
            if(friend.id_user == localStorage.getItem("id_user")){
              this.isFriend = true;
            }
          });
        }
        if(this.user.requestfriend){
          this.user.requestfriend.forEach(rf => {
            if(rf.id_send == this.user.id && rf.id_receive == localStorage.getItem("id_user")){
              this.isRequestFriend = true;
              this.isRequestFriendMsg = "Te ha enviado la solicitud";
            }
            if(rf.id_send == localStorage.getItem("id_user") && rf.id_receive == this.user.id){
              this.isRequestFriend = true;
              this.isRequestFriendMsg = "Le has enviado la solicitud";
            }
          });
        }
        if(this.user.requestmatch){
          this.user.requestmatch.forEach(rm => {
            if(rm.id_send == this.user.id && rm.id_receive == localStorage.getItem("id_user")){
              this.isRequestMatch = true;
              this.isRequestMatchMsg = "Te ha invitado a jugar";
            }
            if(rm.id_send == localStorage.getItem("id_user") && rm.id_receive == this.user.id){
              this.isRequestMatch = true;
              this.isRequestMatchMsg = "Lo has invitado a jugar";
            }
          });
        }
        if(this.compareUser == false){
          this.radarChartData = [
            {
              data: [this.user.forehand, this.user.backhand, this.user.service, this.user.volley, this.user.resistence],
              label: this.user.firstname+" "+this.user.lastname
            },
          ];
        }else{
          this.userService.getProfile(Number(localStorage.getItem("id_user"))).subscribe(
            (response_aux)=>{
              this.user_aux = response_aux.data[0];
                this.radarChartData = [
                  {
                    data: [this.user.forehand, this.user.backhand, this.user.service, this.user.volley, this.user.resistence],
                    label: this.user.firstname+" "+this.user.lastname
                  },
                  {
                    data: [this.user_aux.forehand, this.user_aux.backhand, this.user_aux.service, this.user_aux.volley, this.user_aux.resistence],
                    label: this.user_aux.firstname+" "+this.user_aux.lastname
                  },
                ];
            } ,
            (error) =>{
             
            }
          )
        }
      } ,
      (error) =>{
       
      }
    )

  }

  seeFriends(){

    let textHtml = "";
    let this_aux = this;

    for (let f of this.user.friends) {
      textHtml += `
      <div class="card green">
      <div class="card-content left-align white-text">
        <a href="/profile/${f.id_user}"><span id="${f.id_user}" class="card-title white-text pointer goProfile">${f.username}</span></a>
        <br>
        <div class="row">
          <div class="col s3 left-align ">
            <a href="/profile/${f.id_user}">
              <img id="${f.id_user}" src="${this_aux.path}${f.path}" alt="" class="circle pointer responsive-img goProfile">
            </a>
          </div>
          <div class="col s9 left-align ">
            <p id="${f.id_user}" class="pointer goProfile">${f.firstname} ${f.lastname}</p>
            <p style="margin-top:15px;">${f.gameLevel} - ${f.gameStyle}</p>
          </div>
        </div>
      </div>
    </div>
      `
    }

    swal({
      title: "Amigos de "+this.user.username, 
      html: textHtml,  
      showConfirmButton: false 
    });

  }

  sendRequestFriend(id){
    let data;
    data = {
      id: id,
    }
    $("#btn-request-friend").fadeOut(0);
    this.requestFriendService.sendRequest(data).subscribe(
      (response)=>{
          swal({
            title: 'Solicitud de amistad enviada!',
            text: "Espera a que el usuario te acepte",
            type: 'info',
          })
          return;
      })
    
    }

    openRequesForm(){
      if(this.user_aux.googlePlaceId){
        $("#newMatchForm").fadeIn();
      }else{
        swal({
          title: 'Advertencia',
          text: "Para invitar a un jugador debes tener club favorito",
          type: 'info',
          confirmButtonColor: "#ff9800",
        })
      }
      
    }


    sendRequestMatch(id){

      let this_aux = this;

      if(this.formMatch.value.title == ""){
        swal({
          title: 'Título',
          text: 'Debes ingresar el título para el partido',
          type: 'error',
          confirmButtonColor: "#ff9800",
        });
        return;
      }
      if($('.datepicker')[0].value == ""){
        swal({
          title: 'Fecha',
          text: 'Debes ingresar la fecha para el partido',
          type: 'error',
          confirmButtonColor: "#ff9800",
        });
        return;
      }
      if($('.timepicker')[0].value == ""){
        swal({
          title: 'Hora',
          text: 'Debes ingresar la hora para el partido',
          type: 'error',
          confirmButtonColor: "#ff9800",
        });
        return;
      }
      let date = $('.datepicker')[0].value;
      let hour = $('.timepicker')[0].value;

      let data = {
        id_receive: this.user.id,
        title: this.formMatch.value.title,
        date: date,
        hour: hour,
        googlePlaceId: this.user_aux.googlePlaceId
      }
      this.requestMatchService.sendRequest(data).subscribe(
        (response)=>{
            $("#newMatchForm").fadeOut();
            swal({
              title: 'Solicitud de partido enviada!',
              text: "Espera a que el usuario te acepte",
              type: 'info',
            })
            setTimeout(function(){ this_aux.route.navigate(['/profile/'+this.user.id]); }, 2000);
        })
      
      }
  

}
