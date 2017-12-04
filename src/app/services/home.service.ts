import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import { environment } from '../../environments/environment';

@Injectable()
export class HomeService {

  constructor(private http:Http) {}

  getNotices(){

    return this.http.get(`http://admin-tenis.tennis-star.com/web/app_dev.php/api/notice/get-notice/`).map(
      (response) => response.json()
    )
  }

}
