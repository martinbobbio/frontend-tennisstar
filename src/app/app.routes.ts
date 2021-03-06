import {RouterModule,Routes} from '@angular/router';

import { HomeComponent } from "./views/home/home.component";
import { ExplorarComponent } from "./views/explorar-map/explorar.component";
import { LoginComponent } from "./views/login/login.component";
import { RegisterComponent } from "./views/register/register.component";
import { CompletePerfilComponent } from "./views/complete-perfil/complete-perfil.component";
import { CompleteGameStatsComponent } from "./views/complete-game-stats/complete-game-stats.component";
import { ProfileComponent } from "./views/profile/profile.component";
import { ClubComponent } from "./views/club/club.component";
import { TournamentComponent } from "./views/tournament/tournament.component";
import { NotificationsComponent } from "./views/notifications/notifications.component";
import { StatsComponent } from "./views/stats/stats.component";
import { SearchUsersComponent } from "./views/search-users/search-users.component";

const APP_ROUTES: Routes = [
    { path: '', component:HomeComponent},
    { path: 'explorar', component:ExplorarComponent},
    { path: 'explorar/:option', component:ExplorarComponent},
    { path: 'login', component:LoginComponent},
    { path: 'register', component:RegisterComponent},
    { path: 'completePerfil', component:CompletePerfilComponent},
    { path: 'completeGameStats', component:CompleteGameStatsComponent},
    { path: 'profile', component:ProfileComponent},
    { path: 'buscarUsuarios', component:SearchUsersComponent},
    { path: 'profile/:id', component:ProfileComponent},
    { path: 'club/:id', component:ClubComponent},
    { path: 'tournament/:id', component:TournamentComponent},
    { path: 'admin/notificaciones', component:NotificationsComponent},
    { path: 'admin/estadisticas', component:StatsComponent},
    { path: '**', pathMatch:'full', redirectTo:''},
]

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
