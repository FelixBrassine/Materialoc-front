import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {RoomService} from "../../services/room.service";
import {Router} from "@angular/router";
import {Material, MaterialService} from "../../services/material.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit,OnDestroy{
  onChangedSub!: Subscription;
  registerForm: FormGroup;
  isLoading: boolean = false;

  materialsList!: Material[];

  constructor(
    private readonly _roomService: RoomService,
    private router: Router,
    private readonly _materialService: MaterialService
  ) {
    this.registerForm = new FormGroup({
      'name': new FormControl(''),
      'numberPlaces': new FormControl(''),
      'teacherRoom': new FormControl(''),
      'materialsId': new FormControl([])
    })
  }
  ngOnInit(): void {
    this.onChangedSub = this._materialService.$materialChanged.subscribe( () => this.loadMaterials() )
  }
  ngOnDestroy(): void {
    this.onChangedSub.unsubscribe();
  }
  onRegister(){
    if( this.registerForm.valid ){
      this._roomService.add(this.registerForm.value).subscribe();
      this.router.navigate(['salle'])
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
