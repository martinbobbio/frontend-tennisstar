import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';

import * as $ from 'jquery';
import swal from 'sweetalert2';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public loginService:LoginService) {
    this.form = new FormGroup({
      'password': new FormControl(''),
      'email': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
    })
  }

  form:FormGroup;

  ngOnInit() {

  }

  loginForm(){
      let data = {
        email: this.form.get("email").value,
        password: this.form.get("password").value,
      }

      console.log(data);

      this.loginService.sendData(data).subscribe(
        (response)=>{
          alert("ok");
        } ,
        (error) =>{ 
          swal({
            title: 'Error',
            text: 'El email o contraseña son invalidos',
            type: 'error',
          })
          this.form.reset({
            password:"",
          });
        }
      )
  }

}
