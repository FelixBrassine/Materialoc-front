import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllComponent } from './all/all.component';
import { AddComponent } from './add/add.component';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {ReservationRoutingModule} from "./reservation-routing.module";
import {ReservationService} from "src/app/services/reservation.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { DetailsOverviewComponent } from './details-overview/details-overview.component';
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatSortModule} from "@angular/material/sort";
import {MaterialService} from "../services/material.service";
import {RoomService} from "../services/room.service";



@NgModule({
  declarations: [
    AllComponent,
    AddComponent,
    NavBarComponent,
    DetailsOverviewComponent
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    FormsModule
  ],
  providers: [
    ReservationService,
    MaterialService,
    RoomService
  ]
})
export class ReservationModule { }
