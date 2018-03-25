import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  //Responsive status
  mobile:boolean = false;

  //Chart
  radarChartLabels:string[] = ['Drive', 'Réves', 'Servicio', 'Volea', 'Resistencia'];
  radarChartData:any = [
    {data: [65, 59, 90, 81, 56], label: 'Nombre de usuario'},
  ];
  radarChartType:string = 'radar';

  

  constructor() { }

  ngOnInit() {


    var isMobile = window.matchMedia("only screen and (max-width: 576px)");
    if (isMobile.matches) {
        this.mobile = true;
    }

  }

  

}
