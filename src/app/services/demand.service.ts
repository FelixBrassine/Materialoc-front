import { Injectable } from '@angular/core';
import {UserDTO} from "./user.service";
import {Room} from "./room.service";
import {Reservation} from "./reservation.service";
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
export interface RegisterRequest{
  id: number,
  email: string,
  name: string,
  firstName: string,
  login: string,
  phoneNumber: string,
  adress: string,
  statusHistory: Status[],
  currentStatus: Status
}
type RequestStatus = "PENDING" | "ACCEPTED" | "REFUSED" | "RELOCATING" | "PASSED"

export interface Status {
  id: number,
  date: Date,
  status: RequestStatus[]
}
@Injectable()
export class DemandService {
  private _requestListSource = new BehaviorSubject<Reservation[]>([]);
  private _jwt?: string;
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _authService: AuthService
  ) {
    this._jwt = _authService.connectedUser?.token
    _authService.$connectedUser.subscribe(user => {
      this._jwt = user?.token;
    })
  }
  get $requestChanged() {
    return this._requestListSource.asObservable();
  }
  getAll() {
    let headers = new HttpHeaders();
    if( this._jwt)
      headers = headers.append("authorization", this._jwt);
    return this._httpClient.get<RegisterRequest[]>('http://localhost:8080/register/all', {headers: headers})
  }
  getOne(id: number){
    let headers = new HttpHeaders();
    if( this._jwt)
      headers = headers.append("authorization", this._jwt);
    return this._httpClient.get<RegisterRequest>('http://localhost:8080/register/'+ id, {headers: headers});
  }
  accept(id: number){
    console.log(this._jwt)
    let headers = new HttpHeaders();
    if( this._jwt)
      headers = headers.append("authorization", this._jwt);
    return this._httpClient.patch('http://localhost:8080/register/'+id+'/accept' ,'',{headers: headers});
  }
  refuse(id: number){
    let headers = new HttpHeaders();
    if( this._jwt)
      headers = headers.append("authorization", this._jwt);
    return this._httpClient.patch('http://localhost:8080/register/'+id+'/refuse','',{headers: headers});
  }
}
