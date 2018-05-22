import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  stats;
  isAdmin;

  constructor(public homeService:HomeService, public router:Router) { }

  ngOnInit() {

    this.isAdmin = localStorage.getItem("isAdmin");

    if(this.isAdmin != 1){
      this.router.navigate(['/']);
    }

    this.homeService.getStats().subscribe(data =>{
      this.stats = data.data[0];
    });
    
  }

}
