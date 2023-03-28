import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RoomService} from "../services/room.service";
import { AddComponent } from './add/add.component';
import { AllComponent } from './all/all.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {RoomRoutingModule} from "./room-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MaterialService} from "../services/material.service";



@NgModule({
  declarations: [
    AddComponent,
    AllComponent,
    NavBarComponent
  ],
    imports: [
        CommonModule,
        RoomRoutingModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatTableModule,
        MatCheckboxModule,
        MatInputModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        RoomRoutingModule
    ],
  providers: [
    RoomService,
    MaterialService
  ]
})
export class RoomModule { }
