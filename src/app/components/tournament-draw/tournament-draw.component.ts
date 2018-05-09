import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tournament-draw',
  templateUrl: './tournament-draw.component.html',
  styleUrls: ['./tournament-draw.component.css']
})
export class TournamentDrawComponent implements OnInit {

  @Input() players:number;

  constructor() { }

  ngOnInit() {
  }

}
