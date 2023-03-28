import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Material, MaterialService} from "../../services/material.service";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-material-list',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements AfterViewInit,OnInit, OnDestroy{
  admin?: boolean = false;
  displayedColumns: string[] = ['id', 'name','delete'];
  materialList!: Material[];
  isLoading: boolean = false;
  dataSource = new MatTableDataSource<Material>();
  onChangedSub!: Subscription;
  onAdminSub!: Subscription;

  constructor(
    private readonly _authService: AuthService,
    private readonly _materialService: MaterialService
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.onChangedSub = this._materialService.$materialChanged.subscribe( () => this.loadMaterials() )
    this.onAdminSub = this._authService.$admin.subscribe(admin => {
      this.admin = admin;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.connect();
  }
  ngOnDestroy(): void {
    this.onChangedSub.unsubscribe();
    this.onAdminSub.unsubscribe();
  }

  delete(id: number){
    this._materialService.delete(id)
      .subscribe(() => this.loadMaterials());
  }

  loadMaterials(){
    this.isLoading = true;
    this._materialService.getall().subscribe({
      next: (response : any) => {
        this.materialList = response;
        this.dataSource.data = response;
        this.isLoading = false;
      }
    });
  }
}
