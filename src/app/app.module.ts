import {Inject, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HomeComponent} from "./components/home/home.component";
import {FooterComponent} from "./components/footer/footer.component";
import { HeaderComponent} from "./components/header/header.component";
import {AuthComponent} from "./components/auth/auth.component";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {AppRoutingModule} from "./app-routing.module";
import {AuthService} from "./services/auth.service";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {DialogOverviewComponent} from "./components/dialog-overview/dialog-overview.component";
import {UserService} from "./services/user.service";
import {MatSortModule} from "@angular/material/sort";
import { UserComponent } from './components/user/user.component';
import {ReservationService} from "./services/reservation.service";
import {RoomService} from "./services/room.service";
import {DemandService} from "./services/demand.service";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DialogOverviewComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatSortModule
  ],
  providers: [
    AuthService,
    UserService,
    ReservationService,
    RoomService,
    DemandService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
