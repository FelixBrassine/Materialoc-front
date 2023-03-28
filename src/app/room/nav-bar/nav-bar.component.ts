import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy{
  admin?: boolean = false;
  onAdminSub!: Subscription;
  constructor(
    private readonly _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.onAdminSub = this._authService.$admin.subscribe(admin => {
      this.admin = admin;
    });
  }
  ngOnDestroy(): void {
    this.onAdminSub.unsubscribe();
  }
}
