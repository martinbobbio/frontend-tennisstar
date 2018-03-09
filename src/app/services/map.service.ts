import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MapService {

  backUrl = environment.backUrl;

  constructor(private http:Http) {}

  getClubes(latitud:number,longitud:number){

    return this.http.get(`${this.backUrl}/api/map/get-clubes/`).map(
      (response) => response.json()
    )
  }

}
