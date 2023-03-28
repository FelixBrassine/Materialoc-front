import {Component,} from '@angular/core';
import { MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dialog-overview',
  templateUrl: './dialog-overview.component.html',
  styleUrls: ['./dialog-overview.component.scss']
})
export class DialogOverviewComponent {
  constructor(
    private _router: Router,
    private readonly  _authService: AuthService,
    public dialogRef: MatDialogRef<DialogOverviewComponent>,

  ) { }
  deconnection(){
    this._authService.logOut();
    this._router.navigate(["auth"]);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
