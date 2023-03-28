import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MaterialService} from "../../services/material.service";
import {AllComponent} from "../all/all.component";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  form: FormGroup;
  isLoading: boolean = false;
  constructor(
    private readonly _allComponent: AllComponent,
    private readonly _materialService: MaterialService
  ) {
    this.form = new FormGroup({
      'name': new FormControl('')
    });
  }
  onSubmit(){
    if( this.form.valid )
      this._materialService.add(this.form.value).subscribe(
        () => this._allComponent.loadMaterials()
    );
  }
}
