import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {AllComponent} from "./all/all.component";


const routes: Routes = [
  {path: '', redirectTo: 'materiel', pathMatch:'full'},
  {path:'materiel', component: AllComponent}
]

@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
})
export class MaterialRoutingModule{
}
