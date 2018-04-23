import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';
import { RequestFriendService } from '../../services/request-friend.service';
import { MatchService } from '../../services/match.service';

import * as swal from 'sweetalert2';

declare let $: any;


@Component({
  selector: 'home-explorar',
  templateUrl: './home-explorar.component.html',
  styleUrls: ['./home-explorar.component.css']
})
export class HomeExplorarComponent implements OnInit {

  users;
  matchs;

  path:string = environment.backPathImage;

  constructor(public userService:UserService, public requestFriendService:RequestFriendService, public matchService:MatchService) { }

  ngOnInit() {

    this.userService.getUsersRandom().subscribe(
      (response)=>{console.log(response);
        this.users = response.data[0];
      } ,
      (error) =>{
      }
    )

    this.matchService.getMatchRandom().subscribe(
      (response)=>{console.log(response);
        this.matchs = response.data[0];
      } ,
      (error) =>{
      }
    )

  }

  sendRequest(id){
    let data;
    data = {
      id: id,
    }

    $("#explore-user-"+id).fadeOut(0);

    this.requestFriendService.sendRequest(data).subscribe(
      (response)=>{
          swal({
            title: 'Solicitud enviada!',
            text: "Espera a que el usuario te acepte",
            type: 'info',
          })
          
          return;
      })
    

  }

}
