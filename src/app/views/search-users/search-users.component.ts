import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
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

  constructor(public userService:UserService) { }

  ngOnInit() {

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
      })
      return;
    }

    this.userService.getAllUsersFilter(filter).subscribe(
      (response)=>{
        $("#search-count").fadeIn();
        this.users = null;
        this.users = response.data[0];
        alert(this.users.length);
      } 
    )
  }

}
