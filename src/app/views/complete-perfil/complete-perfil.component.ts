import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import * as swal from 'sweetalert2';


declare let jQuery: any;


@Component({
  selector: 'app-complete-perfil',
  templateUrl: './complete-perfil.component.html',
  styleUrls: ['./complete-perfil.component.css']
})
export class CompletePerfilComponent implements OnInit {

  form:FormGroup;
  username:string;

  uploader = new FileUploader({
    url: `http://localhost:8000/_uploader/users/upload`,
    method: "POST",
    headers: [
      { name: "Content-Type", value: "multipart/form-data" },
    ]
  });

  constructor(public userService:UserService,public router:Router) {
    this.form = new FormGroup({
      'firstname': new FormControl(''),
      'lastname': new FormControl(''),
      'age': new FormControl(''),
    });
  }

  ngOnInit() {
    this.username = localStorage.getItem("username");
  }

  submitForm(){

    this.uploader.uploadAll();

    /*if(this.form.get("firstname").value != "" && this.form.get("lastname").value != "" && this.form.get("age").value != ""){
      
      let data = {
        firstname: this.form.get("firstname").value,
        lastname: this.form.get("lastname").value,
        age: this.form.get("age").value,
      }

      this.userService.sendProfileData(data).subscribe(
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
    }*/

  }

}
