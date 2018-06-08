import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { ActivatedRoute,Params, Router } from '@angular/router';
import * as swal from 'sweetalert2';

declare let $: any;

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  mobile = false;
  tournament;
  tournament_id;

  isCreator:boolean = false;

  statusText = "Esperando jugadores";

  constructor(public tournamentService:TournamentService,public router:ActivatedRoute) { }

  ngOnInit() {

    if(localStorage.getItem("id_user") == null){
      swal({
        title: "Acceso",
        text: "Debes iniciar sesión para acceder aquí",
        type: "info",
        showConfirmButton: false
     })
     setTimeout(function() {
      location.href = "/login";
     }, 2000);
  }

    var isMobile = window.matchMedia("only screen and (max-width: 576px)");
    if (isMobile.matches) {
        this.mobile = true;
    }

    this.router.params.forEach((params: Params) => {
      if(params['id']){
        this.tournament_id = params['id'];
      }
    })

    this.getTournament();

  }

  leave(){
    $("#leave-button").fadeOut(0);
    $("#leave-loader").fadeIn();

    this.tournamentService.leave(this.tournament["id"],this.tournament["countTotal"]).subscribe(
      (response)=>{
        $("#leave-loader").fadeOut();
        let status = response.data[0];
        if(status == "ok"){
          swal({
            title: 'Torneo',
            text: 'Has abandonado el torneo.',
            type: 'info',
            showCloseButton: true,
            showConfirmButton: false
          });
          this.getTournament();
        }
      });

  }

  inscription(){

    $("#inscription-button").fadeOut(0);
    $("#inscription-loader").fadeIn();
    

    this.tournamentService.inscription(this.tournament["id"],this.tournament["countTotal"]).subscribe(
      (response)=>{
        $("#inscription-loader").fadeOut();
        let status = response.data[0];
        if(status == "ok"){
          swal({
            title: 'Torneo',
            text: 'Felicidades, te has inscrito al torneo',
            type: 'success',
            showCloseButton: true,
            showConfirmButton: false
          });
          this.getTournament();
        }else if(status == "error"){
          swal({
            title: 'Torneo',
            text: 'Ya estás inscrito',
            type: 'error',
            showCloseButton: true,
            showConfirmButton: false
          });
        }
      });
  }

  getTournament(){

    this.tournamentService.getTournament(this.tournament_id).subscribe(
      (response)=>{
        this.tournament = response.data[0];
        if(this.tournament.inscriptionFull){
          this.statusText = "Torneo lleno";
        }
        if(this.tournament.tournamentStart == 1){
          this.statusText = "Torneo en proceso";
        }
        if(this.tournament.status == 1){
          this.statusText = "Torneo finalizado";
        }
        if(this.tournament["id_creator"] == localStorage.getItem("id_user")){
          this.isCreator = true;
        }
      });

  }

}
