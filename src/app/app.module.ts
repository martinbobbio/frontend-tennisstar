//Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

//Rutas
import { APP_ROUTING } from "./app.routes";

//Servicios
import { MapService } from './services/map.service';
import { HomeService } from './services/home.service';
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';
import { AuthService } from './services/auth.service';

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
import { NoticesComponent } from './components/notices/notices.component';
import { NoticeComponent } from './components/notice/notice.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { CompletePerfilComponent } from './views/complete-perfil/complete-perfil.component';
import { CompleteGameStatsComponent } from "./views/complete-game-stats/complete-game-stats.component";



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MapComponent,
    DodecaedroComponent,
    ExplorarComponent,
    NoticesComponent,
    NoticeComponent,
    LoginComponent,
    RegisterComponent,
    CompletePerfilComponent,
    CompleteGameStatsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAQZGWfnDR3C28jqGEiJqEQT4BvTXRy_bM'
    }),
    HttpModule,
    APP_ROUTING,
    ReactiveFormsModule
  ],
  providers: [
    MapService,
    HomeService,
    LoginService,
    RegisterService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
