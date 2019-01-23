import { Component, OnInit } from '@angular/core';
import * as swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  iosMessage(){
    swal({
      type: "info",
      title: "Aplicación IOS",
      text: "Proximamente estará en IOS Store",
      confirmButtonText: "Volver", 
      confirmButtonColor: "#ff9800",
      showCloseButton: true,
    }).catch(swal.noop);

  }

}
