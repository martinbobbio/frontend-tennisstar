import { Component } from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";
import { LOCALE_ID } from '@angular/core';
  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(meta: Meta, title: Title) {
    

    meta.addTags([
      { charset: 'utf-8'},
      { name: 'msapplication-TileImage', content: 'assets/images/logo.png' },
      { name: 'theme-color', content: '#4caf50' },
      { name: 'google', content: 'notranslate' },
      { name: 'description', content: 'Sitio WEB de Tennis amateur' },
      { name: 'abstract', content: 'Sitio WEB de Tennis amateur' },
      { name: 'image', content: 'Sitio WEB de Tennis amateur' },
      { name: 'abstract', content: 'Sitio WEB de Tennis amateur' },
      { name: 'keywords', content: 'Tennis, Tenis, Cancha de tenis, Torneo de tenis, Partido de tenis, Cancha de tennis, Torneo de tennis, Partido de tennis,' }
    ]);

  }
  
}

