import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Reservation, ReservationService} from "src/app/services/reservation.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {Room, RoomService} from "../../services/room.service";

@Component({
  selector: 'app-details-overview',
  templateUrl: './details-overview.component.html',
  styleUrls: ['./details-overview.component.scss']
})
export class DetailsOverviewComponent implements OnInit,OnDestroy {
  reservation?: Reservation;
  onReservationSubscription!: Subscription;
  roomId!: number;
  isLoading: boolean = false;
  onChangedSub!: Subscription;
  roomList!: Room[];

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private readonly _reservationService: ReservationService,
    public dialogRef: MatDialogRef<DetailsOverviewComponent>,
    private readonly _roomService: RoomService
  ) {}
  loadRooms(){
    this.isLoading = true;
    this._roomService.getAll().subscribe({
      next:
        data => {
          this.roomList = data;
          this.isLoading = false;
        },
      error: console.error
    });
  }
  ngOnInit(): void {
    this.onReservationSubscription = this._reservationService.getOne(this.data.id).subscribe(
      reservation => this.reservation = reservation
    )
    this.onChangedSub = this._roomService.$roomChanged.subscribe( () => this.loadRooms() );

  }
  ngOnDestroy(): void {
    this.onReservationSubscription.unsubscribe();
  }

  delete(id: number){
    this._reservationService.delete(id).subscribe();
    this.dialogRef.close();
  }
  refuse(id: number){
    this._reservationService.refuse(id).subscribe();
    this.dialogRef.close();
  }
  accept(id: number, roomId: number){
    this._reservationService.accept(id, roomId).subscribe();
    this.dialogRef.close();
  }
  relocate(id: number){
    this._reservationService.relocate(id, this.roomId).subscribe();
    this.dialogRef.close();
  }
}
