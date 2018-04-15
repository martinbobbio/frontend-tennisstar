import { Component, OnInit, Input } from '@angular/core';
import { MapService } from '../../services/map.service';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';

import * as swal from 'sweetalert2';

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

  constructor(public mapService:MapService, public userService:UserService) { }

  ngOnInit() {

    this.isNewUser = localStorage.getItem("new_user")
    if(this.type != 1){

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
    <a class="waves-effect green waves-light btn-large">Partido</a>
    <a class="waves-effect green waves-light btn-large">Torneo</a>
    
    `;

    swal({
      title: "Elige que quieres crear", 
      html: textHtml,  
      showConfirmButton: false 
    });
  }

}
