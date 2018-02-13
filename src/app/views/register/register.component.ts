import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';

import * as $ from 'jquery';
import swal from 'sweetalert2';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public registerService:RegisterService) {
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
        username: this.form.get("email").value,
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

    console.log(data);

    this.registerService.sendData(data).subscribe(
      (response)=>{
        alert("ok");
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
