import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import * as swal from 'sweetalert2';

declare let $: any;


@Component({
  selector: 'app-complete-perfil',
  templateUrl: './complete-perfil.component.html',
  styleUrls: ['./complete-perfil.component.css']
})
export class CompletePerfilComponent implements OnInit {

  form:FormGroup;
  username:string;

  user:any;

  public uploader:FileUploader = new FileUploader({
    url: environment.uploaderUrl,
    autoUpload: true,
    
  });
  public uploadResult:boolean = false;
  public uploadPath:any;
  public pathImgAux;

  

  constructor(public userService:UserService,public router:Router) {
    this.form = new FormGroup({
      'firstname': new FormControl(''),
      'lastname': new FormControl(''),
      'age': new FormControl(''),
    });
    this.userService.checkIfPlayer(Number(localStorage.getItem("id_user"))).subscribe(
      (response)=>{
        this.user = response.data[0];
        if(this.user["status"]){
          this.form = new FormGroup({
            'firstname': new FormControl(this.user["firstname"]),
            'lastname': new FormControl(this.user["lastname"]),
            'age': new FormControl(this.user["age"]),
          });
          setTimeout(function(){
            $("#age").focus();
            $("#lastname").focus();
            $("#firstname").focus();
          }, 1000);
          
          
        }
    })

    this.userService.getImageProfile(Number(localStorage.getItem("id_user"))).subscribe(
      (response)=>{
        this.pathImgAux = response.data[0]["path"];
      })

    
  }

  ngOnInit() {
    this.username = localStorage.getItem("username");

    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if(item.file.type == "image/png" || item.file.type == "image/jpeg"){
      this.uploadResult = true;
      this.uploadPath = JSON.parse(response);
      $("#btn_submit").removeClass("disabled");
      }else{
        swal({
          title: 'Imagen',
          text: 'La imagen debe ser png o jpg',
          type: 'error',
        })
      }
    };
    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.uploadResult = false;
    }
  }

  submitForm(){

    if(this.form.get("firstname").value != "" && this.form.get("lastname").value != "" && this.form.get("age").value != ""){
      
      if(this.form.get("age").value < 0 || this.form.get("age").value > 100){
        swal({
          title: 'Error',
          text: 'Introduce una edad válida',
          type: 'error',
          showCloseButton: true,
        })
        return;
      }
      if(this.uploadResult == true || this.user["status"]){
        let pathImg;
        let pathStatus;
        if(this.uploadResult){
          pathImg = this.uploadPath["files"][0]["path"];
          pathStatus = true;
        }else{
          pathImg = this.pathImgAux;
          pathStatus = false;
        }
        let data = {
          firstname: this.form.get("firstname").value,
          lastname: this.form.get("lastname").value,
          age: this.form.get("age").value,
          path: pathImg,
          pathStatus: pathStatus,
        }

        setTimeout(function(){

        }, 2000);
        
        this.userService.sendProfileData(data).subscribe(
          (response)=>{
            this.router.navigate(['/']);
          } ,
          (error) =>{
          
          }
        )
      }

    }else{
      swal({
        title: 'Error',
        text: 'Todos los campos deben estar completos',
        type: 'error',
        showCloseButton: true,
      })
    }

    if(this.uploadResult == false && !this.user["status"]){
      swal({
        title: 'Error',
        text: 'Por favor, revise que exista la imagen y no tenga un tamaño grande',
        type: 'error',
        showCloseButton: true,
      })
    }

  }

}
