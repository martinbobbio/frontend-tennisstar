import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'home-explorar',
  templateUrl: './home-explorar.component.html',
  styleUrls: ['./home-explorar.component.css']
})
export class HomeExplorarComponent implements OnInit {

  users;

  path:string = environment.backPathImage;

  constructor(public userService:UserService) { }

  ngOnInit() {

    this.userService.getUsersRandom().subscribe(
      (response)=>{console.log(response);
        this.users = response.data[0];
      } ,
      (error) =>{
      
      }
    )

  }

}
