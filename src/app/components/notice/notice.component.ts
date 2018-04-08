import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {

  @Input() type:number = 1;
  @Input() title:string;
  @Input() description:string;
  @Input() createdAt:string;
  @Input() imgsrc:string;
  @Input() videoLink:string;

  is_mobile = false;
  linkVideoYT:string;

  constructor() { }

  ngOnInit() {

    this.linkVideoYT = `https://www.youtube.com/embed/${this.videoLink}`;
    
    if(screen.width <= 576){
      this.is_mobile = true;
    }
  }

}
