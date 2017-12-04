//Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

//Rutas
import { APP_ROUTING } from "./app.routes";

//Servicios
import { MapService } from './services/map.service';
import { HomeService } from './services/home.service';

//Dependencia (Mapa)
import { AgmCoreModule } from '@agm/core';

//Componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './views/home/home.component';
import { MapComponent } from './components/map/map.component';
import { DodecaedroComponent } from './components/dodecaedro/dodecaedro.component';
import { ExplorarComponent } from './views/explorar/explorar.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MapComponent,
    DodecaedroComponent,
    ExplorarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAQZGWfnDR3C28jqGEiJqEQT4BvTXRy_bM'
    }),
    HttpModule,
    APP_ROUTING,
    
  ],
  providers: [
    MapService,
    HomeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
