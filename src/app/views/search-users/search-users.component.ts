import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RequestFriendService } from '../../services/request-friend.service';
import { environment } from '../../../environments/environment';

import * as swal from 'sweetalert2';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {

  users;

  path:string = environment.backPathImage;

  constructor(public userService:UserService, public requestFriendService:RequestFriendService) { }

  ngOnInit() {

    if(localStorage.getItem("id_user") == null){
      swal({
        title: "Acceso",
        text: "Debes iniciar sesión para acceder aquí",
        type: "info",
        showConfirmButton: false
     }).catch(swal.noop);
     setTimeout(function() {
      location.href = "/login";
     }, 2000);
  }

    this.userService.getAllUsers().subscribe(
      (response)=>{
        this.users = response.data[0];
      } 
    )
  }
  
  searchUsers(){

    let filter = $("#search")[0]["value"];

    if(filter == ""){
      swal({
        title: 'Busqueda',
        text: 'El campo de busqueda esta vacio',
        type: 'info',
        showCloseButton: true
      }).catch(swal.noop);
      return;
    }

    this.userService.getAllUsersFilter(filter).subscribe(
      (response)=>{
        $("#search-count").fadeIn();
        this.users = null;
        this.users = response.data[0];
      } 
    )
  }

  sendRequest(id){
    let data;
    data = {
      id: id,
    }

    $("#button-add-"+id).fadeOut(0);

    this.requestFriendService.sendRequest(data).subscribe(
      (response)=>{
        
          swal({
            title: 'Solicitud enviada!',
            text: "Espera a que el usuario te acepte",
            type: 'info',
          }).catch(swal.noop);
          
          return;
      })
    
  }

}
