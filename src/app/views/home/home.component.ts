import { Component, OnInit } from '@angular/core';

import { HomeService } from '../../services/home.service'

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  notices:any[];

  constructor(public homeService:HomeService) { }

  ngOnInit() {

    this.homeService.getNotices().subscribe(data =>{
      this.notices = data.data[0];
    });

    
  }

}
