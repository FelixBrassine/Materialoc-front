import { Injectable } from '@angular/core';
import {BehaviorSubject, map, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Material} from "./material.service";

export interface Room{
  id: number,
  name: string,
  numberPlaces: number,
  teacherRoom: Boolean,
  materials: Material[]
}
@Injectable()
export class RoomService {

  private _roomListSource = new BehaviorSubject<Room[]>([]);
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
  get $roomChanged() {
    return this._roomListSource.asObservable();
  }
  getAll() {
    return this._httpClient.get<Room[]>('http://localhost:8080/room/all')
  }
  getOne(id: number){
    return this._httpClient.get<Room>('http://localhost:8080/room/'+ id);
  }
  add(room: Room){
    let headers = new HttpHeaders();
    if( this._jwt)
      headers = headers.append("authorization", this._jwt);
    return this._httpClient.post('http://localhost:8080/room/add', room, {headers: headers});
  }
  update(id: number, room: Room){
    let headers = new HttpHeaders();
    if( this._jwt)
      headers = headers.append("authorization", this._jwt);
    return this._httpClient.put('http://localhost:8080/room/'+id+'/update', room, {headers: headers});
  }
  addMaterial(id: number, idMaterial: number){
    let headers = new HttpHeaders();
    if( this._jwt)
      headers = headers.append("authorization", this._jwt);
    return this._httpClient.patch('http://localhost:8080/room/'+id, idMaterial, {headers: headers});
  }
  delete(id: number){
    let headers = new HttpHeaders();
    if( this._jwt)
      headers = headers.append("authorization", this._jwt);
    return this._httpClient.delete('http://localhost:8080/room/' + id, {headers: headers});
  }
}
