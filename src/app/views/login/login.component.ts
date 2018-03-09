import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';

import * as $ from 'jquery';
import swal from 'sweetalert2';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public loginService:LoginService, public authService:AuthService, public router:Router) {

    this.authService.handleAuthentication();

    this.form = new FormGroup({
      'password': new FormControl(''),
      'username': new FormControl(''),
    })
  }

  form:FormGroup;

  ngOnInit() {

  }

  login(){
    this.authService.login();
  }

  loginForm(){
    if(this.form.get("username").value != "" && this.form.get("password").value != ""){
      let data = {
        username: this.form.get("username").value,
        password: this.form.get("password").value,
      }

      this.loginService.sendData(data).subscribe(
        (response)=>{

          if(response.error != null){
            return;
          }
          
          if(response.data[0] == "false"){
            swal({
              title: 'Error',
              text: 'La contraseña es invalida',
              type: 'error',
            })
            this.form.reset({
              password:"",
            });
            return;
          }else{
            this.router.navigate(['/']);
          }
        } ,
        (error) =>{
          swal({
            title: 'Error',
            text: 'El nombre de usuario no existe',
            type: 'error',
          })
          this.form.reset({
            password:"",
          });
        }
      )
    }else{
      swal({
        title: 'Error',
        text: 'Debes completar el nombre de usuario y contraseña',
        type: 'error',
      })
    }
  }

}
