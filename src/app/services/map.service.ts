import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import { environment } from '../../environments/environment';

@Injectable()
export class MapService {

  constructor(private http:Http) {}


  getClubes(latitud:number,longitud:number){
    return this.http.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitud},${longitud}&radius=5000&name=tenis&key=AIzaSyAQZGWfnDR3C28jqGEiJqEQT4BvTXRy_bM`).map(
      (response) => response.json()
    )
  }

}
