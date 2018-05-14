import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { ActivatedRoute,Params, Router } from '@angular/router';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  mobile = false;
  tournament;
  tournament_id;

  statusText = "Esperando jugadores";

  constructor(public tournamentService:TournamentService,public router:ActivatedRoute) { }

  ngOnInit() {

    var isMobile = window.matchMedia("only screen and (max-width: 576px)");
    if (isMobile.matches) {
        this.mobile = true;
    }

    this.router.params.forEach((params: Params) => {
      if(params['id']){
        this.tournament_id = params['id'];
      }
    })

    this.tournamentService.getTournament(this.tournament_id).subscribe(
      (response)=>{
        this.tournament = response.data[0];
        if(this.tournament.status == 1){
          this.statusText = "Torneo comenzado";
        }
      });


  }

}
