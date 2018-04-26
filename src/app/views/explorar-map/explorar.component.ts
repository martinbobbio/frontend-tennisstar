import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'explorar',
  templateUrl: './explorar.component.html',
  styleUrls: ['./explorar.component.css']
})
export class ExplorarComponent implements OnInit {

  type = 2;

  constructor(public route:ActivatedRoute) {

    this.route.params.forEach((params: Params) => {
      if(params['option'] && params['option'] == "favoriteClub"){
        this.type = 3;
      }
    });

  }

  ngOnInit() {
  }

}
