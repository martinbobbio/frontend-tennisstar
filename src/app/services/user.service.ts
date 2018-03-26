import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs, RequestMethod, RequestOptions, Response, URLSearchParams  } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  backUrl = environment.backUrl;

  constructor(private http:Http) {}

  sendProfileData(formData){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', localStorage.getItem("id_user"));
    urlSearchParams.append('firstname', formData.firstname);
    urlSearchParams.append('lastname', formData.lastname);
    urlSearchParams.append('age', formData.age);

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/user/complete-profile`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }


  sendSkillData(formData){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', localStorage.getItem("id_user"));
    urlSearchParams.append('gameLevel', formData.gameLevel);
    urlSearchParams.append('gameStyle', formData.gameStyle);
    urlSearchParams.append('typeBackhand', formData.typeBackhand);
    urlSearchParams.append('forehand', formData.forehand);
    urlSearchParams.append('backhand', formData.backhand);
    urlSearchParams.append('service', formData.service);
    urlSearchParams.append('volley', formData.volley);
    urlSearchParams.append('resistence', formData.resistence);

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/user/complete-skill`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  getProfile(id:number){

    return this.http.get(`${this.backUrl}/api/user/get-user/${id}`).map(
      (response) => response.json()
    )

  }

  getProfileStatus(id:number){

    return this.http.get(`${this.backUrl}/api/user/get-user-status/${id}`).map(
      (response) => response.json()
    )

  }

  getUsersRandom(){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', localStorage.getItem("id_user"));

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/user/get-user-random`,body, {headers: headers}).map(
      (response) => response.json()
    )

  }

}
