import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import * as swal from 'sweetalert2';

declare let $: any;


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
    $('select').material_select();
  }

  submitForm(){

    if($(".gameLevel .active").text() != "" && $(".typeBackhand .active").text() != "" && $(".gameStyle .active").text() != ""){
      let data = {
        gameLevel: $(".gameLevel .active").text(),
        gameStyle: $(".typeBackhand .active").text(),
        typeBackhand: $(".gameStyle .active").text(),
        forehand: this.form.get("forehand").value,
        backhand: this.form.get("backhand").value,
        service: this.form.get("service").value,
        volley: this.form.get("volley").value,
        resistence: this.form.get("resistence").value,
      }

      this.userService.sendSkillData(data).subscribe(
        (response)=>{
          this.router.navigate(['/']);
        } ,
        (error) =>{
         
        }
      )
      

    }else{
      swal({
        title: 'Error',
        text: 'Todos los campos deben estar completos',
        type: 'error',
      })
    }

  }

}
