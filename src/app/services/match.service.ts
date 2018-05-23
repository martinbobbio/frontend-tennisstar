import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import { environment } from '../../environments/environment';

@Injectable()
export class MatchService {

  backUrl = environment.backUrl;

  constructor(private http:Http) {}

  getMatchRandom(){

    return this.http.get(`${this.backUrl}/api/match/get-match-random`).map(
      (response) => response.json()
    )
  }

  getAllMatchs(){

    return this.http.get(`${this.backUrl}/api/match/get-all-matchs`).map(
      (response) => response.json()
    )
  }

  getMatchs(){

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id_user', localStorage.getItem("id_user"));

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/match/get-matchs`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  createMatch(formData){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();

    urlSearchParams.append('id_user', localStorage.getItem("id_user"));
    urlSearchParams.append('title', formData.title);
    urlSearchParams.append('type', formData.type);
    urlSearchParams.append('isPrivate', formData.isPrivate);
    urlSearchParams.append('date', formData.date);
    urlSearchParams.append('hour', formData.hour);
    urlSearchParams.append('lon', formData.lon);
    urlSearchParams.append('lat', formData.lat);
    urlSearchParams.append('googlePlaceId', formData.googlePlaceId);

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/match/new-match`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

  checkMatch(userMatch){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();

    urlSearchParams.append('id_um', userMatch);
    urlSearchParams.append('id_user', localStorage.getItem("id_user"));

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/match/check-match`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

}
