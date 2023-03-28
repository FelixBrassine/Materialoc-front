import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";

export interface Material{
  id: number,
  name: string
}
@Injectable()
export class MaterialService{

  private _materialListSource = new BehaviorSubject<Material[]>([]);
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
  get $materialChanged() {
    return this._materialListSource.asObservable();
  }

  getall() {
    return this._httpClient.get<Material[]>('http://localhost:8080/material/all')
  }
  add(name: string){
    let headers = new HttpHeaders();
    if( this._jwt)
      headers = headers.append("authorization", this._jwt);
    return this._httpClient.post('http://localhost:8080/material/add', name, {headers: headers});
  }
  delete(id: number){
    let headers = new HttpHeaders();
    if( this._jwt)
      headers = headers.append("authorization", this._jwt);
    return this._httpClient.delete('http://localhost:8080/material/' + id, {headers: headers});
  }
}
