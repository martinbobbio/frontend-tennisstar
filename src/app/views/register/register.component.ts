import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';

import * as $ from 'jquery';
import * as swal from 'sweetalert2';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public registerService:RegisterService, public router:Router) {
    this.form = new FormGroup({
      'username': new FormControl(''),
      'password': new FormControl(''),
      'password2': new FormControl(''),
      'email': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
    })
  }

  form:FormGroup;
  
  ngOnInit() {

  }

  registerForm(){
    let data;
    if(this.form.get("password").value === this.form.get("password2").value){
      data = {
        username: this.form.get("username").value,
        email: this.form.get("email").value,
        password: this.form.get("password").value,
      }
    }else{
      swal({
        title: 'Error',
        text: 'Las contraseñas no coinciden',
        type: 'error',
      })
      return;
    }
    if(this.form.get("password").value == "" || this.form.get("password2").value == ""){
      swal({
        title: 'Error',
        text: 'Debe ingresar contraseña',
        type: 'error',
      })
      return;
    }

    this.registerService.sendData(data).subscribe(
      (response)=>{
        if(response.error != null){
          swal({
            title: 'Error',
            text: response.error[0],
            type: 'error',
          })
          return;
        }

        this.router.navigate(['/']);
        
      } ,
      (error) =>{ 
        swal({
          title: 'Error',
          text: 'Error en el registro',
          type: 'error',
        })
        this.form.reset({
          password:"",
          password2:""
        });
      }
    )
}

}
