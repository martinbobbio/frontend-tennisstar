import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
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

  public uploader:FileUploader = new FileUploader({
    url: environment.uploaderUrl,
    autoUpload: true
  });
  public uploadResult:any = null;

  

  constructor(public userService:UserService,public router:Router) {
    this.form = new FormGroup({
      'firstname': new FormControl(''),
      'lastname': new FormControl(''),
      'age': new FormControl(''),
    });
  }

  ngOnInit() {
    this.username = localStorage.getItem("username");

    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    
  }

  submitForm(){


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
