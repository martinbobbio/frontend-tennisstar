import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare let jQuery: any;

@Component({
  selector: 'app-complete-game-stats',
  templateUrl: './complete-game-stats.component.html',
  styleUrls: ['./complete-game-stats.component.css']
})
export class CompleteGameStatsComponent implements OnInit {

  form:FormGroup;

  constructor() {
    this.form = new FormGroup({
      'gameLevel': new FormControl(''),
      'gameStyle': new FormControl(''),
      'backhand': new FormControl(''),
    });
  }

  ngOnInit() {
    jQuery('select').material_select();
  }

  submitForm(){

  }

}
