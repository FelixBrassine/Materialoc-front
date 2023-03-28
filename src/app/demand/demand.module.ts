import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllComponent } from './all/all.component';
import {DemandService} from "../services/demand.service";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {DemandRoutingModule} from "./demand-routing.module";
import {MaterialService} from "../services/material.service";
import {DetailsOverviewComponent} from "./details-overview/details-overview.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {MatSortModule} from "@angular/material/sort";



@NgModule({
  declarations: [
    AllComponent,
    DetailsOverviewComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    DemandRoutingModule,
    MatExpansionModule,
    MatListModule,
    MatSortModule
  ],
  providers: [
    DemandService,
    MaterialService
  ]
})
export class DemandModule { }
