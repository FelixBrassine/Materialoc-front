import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogOverviewComponent} from "../dialog-overview/dialog-overview.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{

  connected?: boolean;
  admin?: boolean;

  constructor(
    private readonly  _authService: AuthService,
    private _router: Router,
    private _dialog: MatDialog
  ) {
    _authService.$connected.subscribe(isConnected => this.connected = isConnected )
    //
    _authService.$connectedUser.subscribe(user =>{
      this.admin = user?.roles.some((value) => value == "ADMIN")
    })
  }
  openDialog(): void {
    const dialogRef = this._dialog.open(DialogOverviewComponent);
  }
}

