import {RouterModule,Routes} from '@angular/router';

import { HomeComponent } from "./views/home/home.component";
import { ExplorarComponent } from "./views/explorar-map/explorar.component";
import { LoginComponent } from "./views/login/login.component";
import { RegisterComponent } from "./views/register/register.component";
import { CompletePerfilComponent } from "./views/complete-perfil/complete-perfil.component";
import { CompleteGameStatsComponent } from "./views/complete-game-stats/complete-game-stats.component";
import { ProfileComponent } from "./views/profile/profile.component";

const APP_ROUTES: Routes = [
    { path: '', component:HomeComponent},
    { path: 'explorar', component:ExplorarComponent},
    { path: 'login', component:LoginComponent},
    { path: 'register', component:RegisterComponent},
    { path: 'completePerfil', component:CompletePerfilComponent},
    { path: 'completeGameStats', component:CompleteGameStatsComponent},
    { path: ':id/profile', component:ProfileComponent},
    { path: '**', pathMatch:'full', redirectTo:''},
]

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
