import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptionsArgs, RequestMethod, RequestOptions, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import { environment } from '../../environments/environment';

@Injectable()
export class RegisterService {

  constructor(private http:Http) {}

  sendData(formData){

    let data = JSON.stringify(formData);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    let requestOptions = new RequestOptions({
        method: RequestMethod.Post,
        url: `http://localhost:8000/api/register/`,
        headers: headers,
        body: data
    });

    return this.http.post(`http://localhost:8000/api/register/`,data,requestOptions).map(
      (response) => response.json()
    )
  }

}
