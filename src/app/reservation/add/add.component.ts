import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReservationService} from "../../services/reservation.service";
import {AbstractControl, FormControl, FormGroup, ValidatorFn} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Material, MaterialService} from "../../services/material.service";
import {Subscription} from "rxjs";

function inFutureDays( days:number ): ValidatorFn{
  return (control: AbstractControl) => {
    let minDate = new Date()
    minDate.setDate( minDate.getDate()+days )
    minDate = new Date( minDate.getFullYear(), minDate.getMonth(), minDate.getDate() )
    const inputValue = new Date(control.value);
    if( inputValue >= minDate )
      return null;
    return { notInfFuture : "Date was not in the future" }
  }
}
function minTime(minHour: number):ValidatorFn{
  return (control: AbstractControl) => {
    const inputTime = new Date("01/01/1970 "+control.value);
    if(inputTime.getHours()>=minHour){
      return null;
    }
    return { timeBeforeOpen : "Time is before opening" }
  }
}
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy{
  onChangedSub!: Subscription;
  registerForm: FormGroup;
  isLoading: boolean = false;
  materialsList!: Material[];

  constructor(
    private readonly _authService: AuthService,
    private reservationService: ReservationService,
    private router: Router,
    private readonly _materialService: MaterialService
  ){
    this.registerForm = new FormGroup({
      'justification': new FormControl('', ),
      'neededCapacity': new FormControl(''),
      'date': new FormControl('', [inFutureDays(4)]),
      'beginAt': new FormControl('',[minTime(8)]),
      'endAt': new FormControl(''),
      'materialIds': new FormControl('')
    })
  }

  ngOnInit() {
    this.onChangedSub = this._materialService.$materialChanged.subscribe( () => this.loadMaterials() )
  }
  ngOnDestroy(): void {
    this.onChangedSub.unsubscribe();
  }
  onRegister(){
    if( this.registerForm.valid ){
      this.reservationService.add(this.registerForm.value).subscribe();
      this.router.navigate(['reserver'])
    }
  }
  loadMaterials(){
    this.isLoading = true;
    this._materialService.getall().subscribe({
      next: (response : any) => {
        this.materialsList = response;
        this.isLoading = false;
      }
    });
  }
}
