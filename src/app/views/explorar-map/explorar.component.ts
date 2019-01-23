import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import * as swal from 'sweetalert2';

@Component({
  selector: 'explorar',
  templateUrl: './explorar.component.html',
  styleUrls: ['./explorar.component.css']
})
export class ExplorarComponent implements OnInit {

  type = 2;

  createMatch:boolean = false;
  createTournament:boolean = false;
  viewMatch:boolean = false;
  viewTournament:boolean = false;


  constructor(public route:ActivatedRoute) {

    this.route.params.forEach((params: Params) => {
      if(params['option'] && params['option'] == "favoriteClub"){
        this.type = 3;
      }
      if(params['option'] && params['option'] == "match"){
        this.createMatch = true;
      }
      if(params['option'] && params['option'] == "tournament"){
        this.createTournament = true;
      }
      if(params['option'] && params['option'] == "verPartidos"){
        this.viewMatch = true;
      }
      if(params['option'] && params['option'] == "verTorneos"){
        this.viewTournament = true;
      }
    });

  }

  ngOnInit() {

    if(localStorage.getItem("id_user") == null){
      swal({
        title: "Acceso",
        text: "Debes iniciar sesión para acceder aquí",
        type: "info",
        showConfirmButton: false
     }).done()
     setTimeout(function() {
      location.href = "/login";
     }, 2000);
  }

  }

}
