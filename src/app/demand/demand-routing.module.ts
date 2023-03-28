import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {AllComponent} from "./all/all.component";


const routes: Routes = [
  {path: '', redirectTo: 'demande', pathMatch:'full'},
  {path:'demande', component: AllComponent}
]

@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
})
export class DemandRoutingModule{
}
