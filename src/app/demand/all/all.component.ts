import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {MatPaginator} from "@angular/material/paginator";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatDialog} from "@angular/material/dialog";
import {MatSort, Sort} from "@angular/material/sort";
import {DetailsOverviewComponent} from "../details-overview/details-overview.component";
import {DemandService, RegisterRequest} from "../../services/demand.service";

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit, OnDestroy, AfterViewInit{
  admin?: boolean = false;
  onAdminSub!: Subscription;
  displayedColumns: string[] = ['id', 'name', 'email', 'currentStatus', 'details'];
  requestList!: RegisterRequest[];
  onChangedSub!: Subscription;
  isLoading: boolean = false;
  dataSource = new MatTableDataSource<RegisterRequest>();

  constructor(
    private readonly _authService: AuthService,
    private _liveAnnouncer: LiveAnnouncer,
    private readonly _demandService: DemandService,
    private _dialog: MatDialog
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.onChangedSub = this._demandService.$requestChanged.subscribe( () => this.loadRequest() );
    this.onAdminSub = this._authService.$admin.subscribe(admin => {
      this.admin = admin;
    })
  }

  ngAfterViewInit() {
    this.onChangedSub = this._demandService.$requestChanged.subscribe( () => this.loadRequest() );
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.connect();
  }
  ngOnDestroy(): void {
    this.onChangedSub.unsubscribe();
    this.onAdminSub.unsubscribe();
  }
  loadRequest(){
    this.isLoading = true;
    this._demandService.getAll().subscribe({
      next:
        data => {
          this.requestList = data;
          this.dataSource.data = data;
          this.isLoading = false;
        },
      error: console.error
    });
  }
  openDialog(id: number): void {
    const dialogRef = this._dialog.open(
      DetailsOverviewComponent,
      {data: {id: id}}
    );
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
