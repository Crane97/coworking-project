import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/interfaces/usuario';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-admin-swap',
  templateUrl: './admin-swap.component.html',
  styleUrls: ['./admin-swap.component.css']
})
export class AdminSwapComponent implements OnInit {

  page:number = 0;

  users : Usuario[];
  newAdmin : Usuario;

  currentUser : Usuario;

  form: FormGroup;

  constructor(private fb : FormBuilder,
    private companyService : CompanyService,
    private _snackBar : MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.currentUser = data.currentUser;
     }

  ngOnInit(): void {
    this.listAllUsersFromCompany(this.currentUser.company.id);
    this.form = this.fb.group({
      selectedAdmin: ['',Validators.required]
    });
  }

  listAllUsersFromCompany(companyId : number){
    this.companyService.getWorkersForCompany(this.page, companyId).subscribe(data => {
      this.users = data['content'];
      console.log(this.users);
    },
    (error)=>{
      console.log(error.error.message);
    })
  }

  submitForm(){
    this.newAdmin = this.form.value.selectedAdmin;
    console.log(this.newAdmin);
    this.selectNewAdmin(this.newAdmin);
  }

  selectNewAdmin(newAdmin : Usuario){
    this.companyService.selectNewAdmin(this.currentUser.company.id, newAdmin.id).subscribe(data =>{
      this._snackBar.open('Se ha cambiado el administrador de la empresa', '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    })
  }

}
