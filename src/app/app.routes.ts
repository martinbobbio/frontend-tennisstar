import {RouterModule,Routes} from '@angular/router';

import { HomeComponent } from "./views/home/home.component";
import { ExplorarComponent } from "./views/explorar/explorar.component";

const APP_ROUTES: Routes = [
    { path: '', component:HomeComponent},
    { path: 'explorar', component:ExplorarComponent},
    { path: '**', pathMatch:'full', redirectTo:'home'},
]

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
