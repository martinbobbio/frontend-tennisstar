import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

declare let $: any;

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications;

  constructor(public homeService:HomeService) { }

  ngOnInit() {

    this.homeService.getNotifications().subscribe(data =>{
      this.notifications = data.data[0];

      setTimeout(function() {
        $(document).ready(function() {
          $('select').material_select();
        });
      }, 1000);

      for(let n of this.notifications){

        if(n["entity"] == "user"){
          n["entity"] = "account_circle";
        }
        if(n["entity"] == "playerUser"){
          n["entity"] = "account_box";
        }
        if(n["entity"] == "skillUser"){
          n["entity"] = "donut_small";
        }
        if(n["entity"] == "notice"){
          n["entity"] = "new_releases";
        }
        if(n["entity"] == "match"){
          n["entity"] = "event";
        }
        if(n["entity"] == "tournament"){
          n["entity"] = "stars";
        }
        if(n["entity"] == "requestFriend"){
          n["entity"] = "person_add";
        }
        if(n["entity"] == "requestMatch"){
          n["entity"] = "record_voice_over";
        }
        if(n["entity"] == "clubFavorite"){
          n["entity"] = "place";
        }
      }
      
    });


  }

  filter(){
    alert("XD");
  }

}
