import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MapService } from '../../services/map.service';
import { UserService } from '../../services/user.service';
import { MatchService } from '../../services/match.service';
import { environment } from '../../../environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as swal from 'sweetalert2';

declare let $: any;

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() type:number = 1;

  isNewUser;

  //Imagenes para el home
  homeImages=["federer","djokovic","murray","nadal","del potro","dimitrov","zverev"];
  homeImageIndex;

  //Estados
  isLogged:boolean = false;
  
  //Latitud y Longitud (Escuela Da Vinci)
  lat: number = -34.604486;
  lng: number = -58.396329;
  zoom: number = 13;

  places:any[];

  //Status Jugador
  fullPlayer:boolean = null;
  fullGame:boolean = null;
  fullCount:number = 0;
  completeCharge:boolean = true;

  formMatch:FormGroup
  latMatch;
  lonMatch;
  googlePlaceIdMatch;
  namePlaceMatch = "";

  constructor(public mapService:MapService, public userService:UserService, public matchService:MatchService, public router:Router) {
    this.formMatch = new FormGroup({
      'title': new FormControl('',Validators.required),
      'type': new FormControl('',Validators.required),
      'isPrivate': new FormControl(0),
      'date': new FormControl(),
      'hour': new FormControl(),
    });
  }

  ngOnInit() {

    this.isNewUser = localStorage.getItem("new_user")
    if(this.type != 1){

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

      this.mapService.getClubes(this.lat, this.lng).subscribe(
        (data) => {
          this.places = data.data[0].results;
        })
    }

    if(localStorage.getItem("id_user") != null){
      this.completeCharge = false;
      this.userService.getProfileStatus(Number(localStorage.getItem("id_user"))).subscribe(
        (response)=>{
          this.fullPlayer = response.data[0]["fullPlayer"];
          this.fullGame = response.data[0]["fullGame"];
          if(this.fullGame == true) this.fullCount++;
          if(this.fullPlayer == true) this.fullCount++;
          this.completeCharge = true;
        } ,
        (error) =>{
        
        }
      )
    }

    this.homeImageIndex = Math.floor(Math.random() * 7);

  }

  selectMarker(marker){console.log(marker);
    
    let photoUrl;
    let ratingHtml;
    let ratingStars;
    let openingHtml;

    if(marker.photos){
      photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${marker.photos[0].photo_reference}&key=${environment.googleApiKey}`;
    }else{
      photoUrl = "assets/images/fondo-tenis.jpg"
    }

    if(marker.rating){
      ratingStars = marker.rating;
    }else{
      ratingHtml = ``
    }
    

    if(ratingStars > 0.4){
      ratingHtml = `<i class="material-icons yellow-text">star_half</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i>`;
    }
    if(ratingStars > 0.9){
      ratingHtml = `<i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i>`;
    }
    if(ratingStars > 1.4){
      ratingHtml = `<i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star_half</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i>`;
    }
    if(ratingStars > 1.9){
      ratingHtml = `<i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i>`;
    }
    if(ratingStars > 2.4){
      ratingHtml = `<i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star_half</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i>`;
    }
    if(ratingStars > 2.9){
      ratingHtml = `<i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i>`;
    }
    if(ratingStars > 3.4){
      ratingHtml = `<i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star_half</i><i class="material-icons yellow-text">star_border</i>`;
    }
    if(ratingStars > 3.9){
      ratingHtml = `<i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star_border</i>`;
    }
    if(ratingStars > 4.4){
      ratingHtml = `<i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star_half</i>`;
    }
    if(ratingStars > 4.9){
      ratingHtml = `<i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i>`;
    }

    if(marker.opening_hours){
      if(marker.opening_hours.open_now == true){
        openingHtml = `<p class="green-text left-align">Abierto</p>`;
      }else{
        openingHtml = `<p class="red-text left-align">Cerrado</p>`
      }
    }else{
      openingHtml = `<p class="grey-text left-align">Horario desconocido</p>`
    }
    
    let textHtml = `
    <br>
    <div class="row">
      <div class="col s6">
        <img src="${photoUrl}" class="responsive-img">
      </div>
      <div class="col s6">    
        <p class="black-text left-align">${marker.name}</p>
        ${openingHtml}
        <p class="black-text left-align">${ratingHtml}</p>
      </div>
    </div>
    <a id="newMatch" class="waves-effect green waves-light btn-large">Partido</a>
    <a class="waves-effect green waves-light btn-large">Torneo</a>
    `;

    swal({
      title: "Elige que quieres crear", 
      html: textHtml,  
      showConfirmButton: false 
    });

    $("#newMatch").on('click', () => {
      this.latMatch = marker.geometry.location.lat;
      this.lonMatch = marker.geometry.location.lng;
      this.googlePlaceIdMatch = marker.place_id;
      this.namePlaceMatch = marker.name;
      swal.close();
      $("#newMatchForm").fadeIn();
      $("html, body").animate({ scrollTop: 650 }, 500);
    });

  }

  newMatch(){

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
    if($(".type .active").text() == ""){
      swal({
        title: 'Tipo de partido',
        text: 'Debes ingresar el tipo del partido',
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
    let type = $(".type .active").text();

    console.log(hour);

    let data = {
      title: this.formMatch.value.title,
      type: type,
      isPrivate: this.formMatch.value.isPrivate,
      date: date,
      hour: hour,
      lon: this.lonMatch,
      lat: this.latMatch,
      googlePlaceId: this.googlePlaceIdMatch,
    }

    this.matchService.createMatch(data).subscribe(
      (response)=>{
        swal({
          title: 'Partido creado!',
          text: 'Felicidades has creado un partido, espera que otros jugadores se unan',
          type: 'success',
          showConfirmButton: false
        });
        setTimeout(function(){ this_aux.router.navigate(['/']); }, 3000);
      } ,
      (error) =>{
       
      }
    )
  }

}
