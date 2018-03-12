import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare let jQuery: any;

@Component({
  selector: 'app-complete-perfil',
  templateUrl: './complete-perfil.component.html',
  styleUrls: ['./complete-perfil.component.css']
})
export class CompletePerfilComponent implements OnInit {

  form:FormGroup;

  constructor() {
    this.form = new FormGroup({
      'firstname': new FormControl(''),
      'lastname': new FormControl(''),
      'age': new FormControl(''),
    });
  }

  ngOnInit() {
  }

  submitForm(){

  }

}
