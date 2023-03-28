import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {AllComponent} from "./all/all.component";
import {AddComponent} from "./add/add.component";


const routes: Routes = [
  { path: '', component: NavBarComponent, children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: AllComponent },
      { path: 'new', component: AddComponent }
    ]}
]

@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
})
export class ReservationRoutingModule {
}
