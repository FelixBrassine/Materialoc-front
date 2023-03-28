import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {MatPaginator} from "@angular/material/paginator";
import {Reservation, ReservationService} from "../../services/reservation.service";
import {MatDialog} from "@angular/material/dialog";
import {DetailsOverviewComponent} from "../details-overview/details-overview.component";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit, OnDestroy, AfterViewInit{
  admin?: boolean = false;
  onAdminSub!: Subscription;
  displayedColumns: string[] = ['id', 'madeBy', 'justification', 'neededCapacity', 'date', 'currentStatus', 'details'];
  requestList!: Reservation[];
  onChangedSub!: Subscription;
  isLoading: boolean = false;
  dataSource = new MatTableDataSource<Reservation>();

  constructor(
    private readonly _authService: AuthService,
    private _liveAnnouncer: LiveAnnouncer,
    private readonly _reservationService: ReservationService,
    private _dialog: MatDialog
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.onChangedSub = this._reservationService.$reservationChanged.subscribe( () => this.loadReservation() );
    this.onAdminSub = this._authService.$admin.subscribe(admin => {
      this.admin = admin;
    })
  }

  ngAfterViewInit() {
    this.onChangedSub = this._reservationService.$reservationChanged.subscribe( () => this.loadReservation() );
    this.dataSource.sortingDataAccessor = (item, property)=> {
      switch(property) {
        case 'madeBy.name': return item.madeBy.name;
        default:
          return item[property as keyof Reservation] as string | number;
      }
    };
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.connect();
  }
  ngOnDestroy(): void {
    this.onChangedSub.unsubscribe();
    this.onAdminSub.unsubscribe();
  }
  loadReservation(){
    this.isLoading = true;
    this._reservationService.getAll().subscribe({
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
  madeByTeacher( reserv: Reservation ){
    return reserv.madeBy.roles.includes("TEACHER")
  }
}
