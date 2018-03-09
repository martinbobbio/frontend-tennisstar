import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import { environment } from '../../environments/environment';

@Injectable()
export class HomeService {

  backUrl = environment.backUrl;

  constructor(private http:Http) {}

  getNotices(){console.log(environment)

    return this.http.get(`${this.backUrl}/api/notice/get-notice/`).map(
      (response) => response.json()
    )
  }

}
