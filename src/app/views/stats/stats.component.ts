import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Router } from '@angular/router';

import * as swal from 'sweetalert2';

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

    if(localStorage.getItem("id_user") == null){
      swal({
        title: "Acceso",
        text: "Debes iniciar sesión para acceder aquí",
        type: "info",
        showConfirmButton: false
     })
     setTimeout(function() {
      location.href = "/login";
     }, 2000);
  }

    this.isAdmin = localStorage.getItem("isAdmin");

    if(this.isAdmin != 1){
      this.router.navigate(['/']);
    }

    this.homeService.getStats().subscribe(data =>{
      this.stats = data.data[0];
    });
    
  }

}
