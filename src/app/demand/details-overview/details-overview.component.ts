import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {DemandService, RegisterRequest} from "../../services/demand.service";

@Component({
  selector: 'app-details-overview',
  templateUrl: './details-overview.component.html',
  styleUrls: ['./details-overview.component.scss']
})
export class DetailsOverviewComponent implements OnInit,OnDestroy {
  request?: RegisterRequest;
  onRequestSubscription!: Subscription;
  isLoading: boolean = false;
  onChangedSub!: Subscription;
  requestList!: RegisterRequest[];

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private readonly _demandService: DemandService,
    public dialogRef: MatDialogRef<DetailsOverviewComponent>
  ) {}
  loadRequest(){
    this.isLoading = true;
    this._demandService.getAll().subscribe({
      next:
        data => {
          this.requestList = data;
          this.isLoading = false;
        },
      error: console.error
    });
  }
  ngOnInit(): void {
    this.onRequestSubscription = this._demandService.getOne(this.data.id).subscribe(
      request => this.request = request
    )
    this.onChangedSub = this._demandService.$requestChanged.subscribe( () => this.loadRequest() );

  }
  ngOnDestroy(): void {
    this.onRequestSubscription.unsubscribe();
  }
  refuse(id: number){
    this._demandService.refuse(id).subscribe();
    this.dialogRef.close();
  }
  accept(id: number){
    this._demandService.accept(id).subscribe();
    this.dialogRef.close();
  }
}
