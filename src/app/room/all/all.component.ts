import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Room, RoomService} from "../../services/room.service";
import {MatTableDataSource} from "@angular/material/table";
import {AuthService} from "../../services/auth.service";
import {MatPaginator} from "@angular/material/paginator";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements AfterViewInit, OnInit, OnDestroy {
  admin?: boolean = false;

  displayedColumns: string[] = ['id', 'name', 'numberPlaces', 'type','materials','delete'];
  roomList!: Room[];
  isLoading: boolean = false;
  dataSource = new MatTableDataSource<Room>();
  onChangedSub!: Subscription;
  onAdminSub!: Subscription;

  constructor(
    private readonly _authService: AuthService,
    private readonly _roomService: RoomService
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.onChangedSub = this._roomService.$roomChanged.subscribe( () => this.loadRooms() );
    this.onAdminSub = this._authService.$admin.subscribe(admin => {
      this.admin = admin;
    });
  }

  ngAfterViewInit() {
    this.onChangedSub = this._roomService.$roomChanged.subscribe( () => this.loadRooms() );
    this.dataSource.paginator = this.paginator;
    this.dataSource.connect();
  }
  ngOnDestroy(): void {
    this.onChangedSub.unsubscribe();
    this.onAdminSub.unsubscribe();
  }
  loadRooms(){
    this.isLoading = true;
    this._roomService.getAll().subscribe({
      next:
          data => {
            this.roomList = data;
            this.dataSource.data = data;
            this.isLoading = false;
          },
      error: console.error
    });
  }
  delete(id: number){
    this._roomService.delete(id)
      .subscribe(() => this.loadRooms());
  }
}
