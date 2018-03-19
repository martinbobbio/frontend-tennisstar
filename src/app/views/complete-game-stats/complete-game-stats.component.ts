import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

declare let jQuery: any;

@Component({
  selector: 'app-complete-game-stats',
  templateUrl: './complete-game-stats.component.html',
  styleUrls: ['./complete-game-stats.component.css']
})
export class CompleteGameStatsComponent implements OnInit {

  form:FormGroup;
  username:string;

  constructor(public userService:UserService,public router:Router) {
    this.form = new FormGroup({
      'gameLevel': new FormControl('',Validators.required),
      'gameStyle': new FormControl(''),
      'typeBackhand': new FormControl(''),
      'forehand': new FormControl(50),
      'backhand': new FormControl(50),
      'service': new FormControl(50),
      'volley': new FormControl(50),
      'resistence': new FormControl(50),
    });
  }

  ngOnInit() {
    this.username = localStorage.getItem("username");
    jQuery('select').material_select();
  }

  submitForm(){

    let data = {
      gameLevel: this.form.get("gameLevel").value,
      gameStyle: this.form.get("gameStyle").value,
      typeBackhand: this.form.get("typeBackhand").value,
      forehand: this.form.get("forehand").value,
      backhand: this.form.get("backhand").value,
      service: this.form.get("service").value,
      volley: this.form.get("volley").value,
      resistence: this.form.get("resistence").value,
    }

    console.log(this.form.get("gameLevel"))

    


  }

}
