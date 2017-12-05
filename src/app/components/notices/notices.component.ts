import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css']
})
export class NoticesComponent implements OnInit {

  @Input() notices:any[];

  constructor() {}

  ngOnInit() {console.log(this.notices);
  }

}
