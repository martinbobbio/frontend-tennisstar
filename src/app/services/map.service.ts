import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import { environment } from '../../environments/environment';

@Injectable()
export class MapService {

  constructor(private http:Http) {}


  getClubes(latitud:number,longitud:number){

    return this.http.get(`http://admin-tenis.tennis-star.com/web/app_dev.php/api/map/get-clubes/`).map(
      (response) => response.json()
    )
  }

}
