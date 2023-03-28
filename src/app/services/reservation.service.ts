import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Room} from "./room.service";
import {UserDTO} from "./user.service";

export interface Reservation{
  id: number,
  date: Date,
  beginAt: Date,
  endAt: Date,
  neededCapacity: number,
  justification: string,
  statusHistory: Status[],
  currentStatus: Status,
  madeBy: UserDTO,
  room: Room
}
export interface Status {
  id: number,
  date: Date,
  status: RequestStatus[]
}
type RequestStatus = "PENDING" | "ACCEPTED" | "REFUSED" | "RELOCATING" | "PASSED"

@Injectable()
export class ReservationService {

  private _reservationSubject = new Subject<Reservation>();
  private reservation!: Reservation;
  private _reservationListSource = new BehaviorSubject<Reservation[]>([]);
  private _jwt?: string;

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _authService: AuthService
  ) {
    this._jwt = _authService.connectedUser?.token
    _authService.$connectedUser.subscribe(user =>{
      this._jwt = user?.token;
    })
  }
  setReservation(reservation: Reservation) {
    this.reservation = reservation;
    this._reservationSubject.next(this.reservation);
  }
  getReservation(): Observable<Reservation> {
    return this._reservationSubject.asObservable();
  }
  get $reservationChanged() {
    return this._reservationListSource.asObservable();
  }
  getAll() {
    let headers = new HttpHeaders();
    if( this._jwt)
      headers = headers.append("authorization", this._jwt);
    return this._httpClient.get<Reservation[]>('http://localhost:8080/request/all', {headers: headers})
  }
  getOne(id: number){
    let headers = new HttpHeaders();
    if( this._jwt)
      headers = headers.append("authorization", this._jwt);
    return this._httpClient.get<Reservation>('http://localhost:8080/request/'+ id, {headers: headers});
  }
  add(data: any){
    let headers = new HttpHeaders();
    if( this._jwt)
      headers = headers.append("authorization", this._jwt);
    return this._httpClient.post('http://localhost:8080/request/add', data, {headers: headers});
  }
  update(id: number, reservation: Reservation){
    let headers = new HttpHeaders();
    if( this._jwt)
      headers = headers.append("authorization", this._jwt);
    return this._httpClient.put('http://localhost:8080/request/'+id+'/update', reservation, {headers: headers});
  }
  accept(id: number,  roomId: number){
    console.log(this._jwt)
    let headers = new HttpHeaders();
    if( this._jwt)
      headers = headers.append("authorization", this._jwt);
    return this._httpClient.patch('http://localhost:8080/request/'+id+'/accept?roomId='+roomId ,{headers: headers});
  }
  relocate(id: number,  roomId: number){
    let headers = new HttpHeaders();
    if( this._jwt)
      headers = headers.append("authorization", this._jwt);
    return this._httpClient.patch('http://localhost:8080/request/'+id+'/relocate?roomId='+roomId, {headers: headers});
  }
  refuse(id: number){
    let headers = new HttpHeaders();
    if( this._jwt)
      headers = headers.append("authorization", this._jwt);
    return this._httpClient.patch('http://localhost:8080/request/'+id+'/refuse','',{headers: headers});
  }
  delete(id: number){
    let headers = new HttpHeaders();
    if( this._jwt)
      headers = headers.append("authorization", this._jwt);
    return this._httpClient.delete('http://localhost:8080/request/'+id, {headers: headers});
  }
}
