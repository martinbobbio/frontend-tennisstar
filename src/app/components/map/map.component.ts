import { Component, OnInit, Input } from '@angular/core';

import { MapService } from '../../services/map.service';
import { UserService } from '../../services/user.service';

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
  zoom: number = 12;

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

}
