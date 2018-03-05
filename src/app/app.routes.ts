import {RouterModule,Routes} from '@angular/router';

import { HomeComponent } from "./views/home/home.component";
import { ExplorarComponent } from "./views/explorar/explorar.component";
import { LoginComponent } from "./views/login/login.component";
import { RegisterComponent } from "./views/register/register.component";

const APP_ROUTES: Routes = [
    { path: '', component:HomeComponent},
    { path: 'explorar', component:ExplorarComponent},
    { path: 'login', component:LoginComponent},
    { path: 'register', component:RegisterComponent},
    { path: '**', pathMatch:'full', redirectTo:''},
]

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
