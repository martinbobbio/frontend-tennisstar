import { Component, OnInit } from '@angular/core';

import { HomeService } from '../../services/home.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  notices:any[];

  fullPlayer:boolean = null;
  fullGame:boolean = null;
  fullCount:number = 0;
  completeCharge:boolean = false;

  userAnon:boolean = false;

  constructor(public homeService:HomeService,public userService:UserService) { }

  ngOnInit() {
    
    this.homeService.getNotices().subscribe(data =>{
      this.notices = data.data[0];
    });

    if(localStorage.getItem("id_user") == null){
      this.userAnon = true;
    }

    this.userService.getProfileStatus(Number(localStorage.getItem("id_user"))).subscribe(
      (response)=>{
        this.fullPlayer = response.data[0]["fullPlayer"];
        this.fullGame = response.data[0]["fullGame"];
        if(this.fullGame == true) this.fullCount++;
        if(this.fullPlayer == true) this.fullCount++;
        this.completeCharge = true;
        $("#display-map").fadeIn();
      });

    
  }

}
