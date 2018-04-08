import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

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
  radarChartData:any;
  radarChartType:string = 'radar';

  //User
  user;
  user_aux;
  user_id:number;
  compareUser:boolean = false;
  
  //Path
  path:string = environment.backPathImage;

  constructor(public userService:UserService, public router:ActivatedRoute, public sanitizer:DomSanitizer) { }

  ngOnInit() {

    var isMobile = window.matchMedia("only screen and (max-width: 576px)");
    if (isMobile.matches) {
        this.mobile = true;
    }
    this.router.params.forEach((params: Params) => {
      if(params['id']){
        this.user_id = params['id'];
        this.compareUser = true;
      }else{
        this.user_id = Number(localStorage.getItem("id_user"));
      }
    })

    this.userService.getProfile(this.user_id).subscribe(
      (response)=>{
        this.user = response.data[0];
        if(this.compareUser == false){
          this.radarChartData = [
            {
              data: [this.user.forehand, this.user.backhand, this.user.service, this.user.volley, this.user.resistence],
              label: this.user.firstname+" "+this.user.lastname
            },
          ];
        }else{
          this.userService.getProfile(Number(localStorage.getItem("id_user"))).subscribe(
            (response_aux)=>{
              console.log(response_aux);
              this.user_aux = response_aux.data[0];
                this.radarChartData = [
                  {
                    data: [this.user.forehand, this.user.backhand, this.user.service, this.user.volley, this.user.resistence],
                    label: this.user.firstname+" "+this.user.lastname
                  },
                  {
                    data: [this.user_aux.forehand, this.user_aux.backhand, this.user_aux.service, this.user_aux.volley, this.user_aux.resistence],
                    label: this.user_aux.firstname+" "+this.user_aux.lastname
                  },
                ];
            } ,
            (error) =>{
             
            }
          )
        }
      } ,
      (error) =>{
       
      }
    )

  }

  

}
