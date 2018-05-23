import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';

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
        console.log(this.users);
      } 
    )
  }

}
