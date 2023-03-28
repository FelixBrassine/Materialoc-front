import {Injectable} from "@angular/core";
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService, User} from "./auth.service";
import {Reservation} from "./reservation.service";

type UserRole = "ADMIN" | "TEACHER" | "STUDENT"
export interface UserDTO {
  id: number,
  email: string,
  name: string,
  firstName: string,
  phoneNumber: string,
  adress: string,
  roles: UserRole[]
}

@Injectable()
export class UserService {
  private _userListSource = new BehaviorSubject<Reservation[]>([]);
  private _jwt?: string;

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _authService: AuthService
  ) {
    this._jwt = _authService.connectedUser?.token
    _authService.$connectedUser.subscribe(user =>{
      this._jwt = user?.token
    })
  }
  get $userListChanged() {
    return this._userListSource.asObservable();
  }
  getAll() {
    let headers = new HttpHeaders();
    if( this._jwt)
      headers = headers.append("authorization", this._jwt);
    return this._httpClient.get<UserDTO[]>('http://localhost:8080/user/all', {headers: headers})
  }
  getOne(){
    let headers = new HttpHeaders();
    if( this._jwt)
      headers = headers.append("authorization", this._jwt);
    return this._httpClient.get<UserDTO>('http://localhost:8080/user/profil', {headers: headers});
  }
  add(data: any){
    let headers = new HttpHeaders();
    if( this._jwt)
      headers = headers.append("authorization", this._jwt);
    return this._httpClient.post('http://localhost:8080/user/add', data, {headers: headers});
  }
  getOneById(id: number){
    let headers = new HttpHeaders();
    if( this._jwt)
      headers = headers.append("authorization", this._jwt);
    return this._httpClient.get<UserDTO>('http://localhost:8080/user/'+id, {headers: headers});
  }
}
