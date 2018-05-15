import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import { environment } from '../../environments/environment';

@Injectable()
export class TournamentService {

  backUrl = environment.backUrl;

  constructor(private http:Http) {}

  getTournamentRandom(){

    return this.http.get(`${this.backUrl}/api/tournament/get-tournament-random`).map(
      (response) => response.json()
    )
  }

  getTournament(id){

    return this.http.get(`${this.backUrl}/api/tournament/get-tournament/${id}`).map(
      (response) => response.json()
    )
  }

  createTournament(formData){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();

    urlSearchParams.append('id_user', localStorage.getItem("id_user"));
    urlSearchParams.append('title', formData.title);
    urlSearchParams.append('count', formData.count);
    urlSearchParams.append('date', formData.date);
    urlSearchParams.append('hour', formData.hour);
    urlSearchParams.append('lon', formData.lon);
    urlSearchParams.append('lat', formData.lat);
    urlSearchParams.append('googlePlaceId', formData.googlePlaceId);

    let body = urlSearchParams.toString();

    return this.http.post(`${this.backUrl}/api/tournament/new-tournament`,body, {headers: headers}).map(
      (response) => response.json()
    )
  }

}
