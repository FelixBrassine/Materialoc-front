import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./components/auth/auth.component";
import {HomeComponent} from "./components/home/home.component";
import {UserComponent} from "./components/user/user.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'materiel', loadChildren: () => import('./material/material.module').then( m => m.MaterialModule)},
  {path: 'salle', loadChildren: () => import('./room/room.module').then( m => m.RoomModule)},
  {path: 'reserver', loadChildren: () => import('./reservation/reservation.module').then( m => m.ReservationModule)},
  {path: 'demande', loadChildren: () => import('./demand/demand.module').then( m => m.DemandModule)},
  {path: 'auth', component: AuthComponent},
  {path: 'home', component: HomeComponent},
  {path: 'user', component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
