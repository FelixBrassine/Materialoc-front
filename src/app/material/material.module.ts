import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllComponent } from './all/all.component';
import { AddComponent } from './add/add.component';
import {MaterialService} from "../services/material.service";
import {ReactiveFormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MaterialRoutingModule} from "./material-routing.module";



@NgModule({
  declarations: [
    AllComponent,
    AddComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MaterialRoutingModule
    ],
  providers: [
    MaterialService
  ]
})
export class MaterialModule { }
