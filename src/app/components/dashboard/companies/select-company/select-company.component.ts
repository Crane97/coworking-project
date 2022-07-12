import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Company } from 'src/app/interfaces/company';
import { Usuario } from 'src/app/interfaces/usuario';
import { CompanyService } from 'src/app/services/company.service';
import { RestapiService } from 'src/app/services/restapi.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-select-company',
  templateUrl: './select-company.component.html',
  styleUrls: ['./select-company.component.css']
})
export class SelectCompanyComponent implements OnInit {

  page:number = 0;
  companies : Company[];
  company : number;

  form: FormGroup;
  currentUser : Usuario;

  constructor(private fb : FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data,
    private companyService : CompanyService) {
      this.currentUser = data.currentUser;
      console.log(this.currentUser);
    }

  ngOnInit(): void {
    console.log("ngOnInit");
    this.listAllCompanies();
    this.form = this.fb.group({
      selectedCompany: ['', Validators.required]
    });
  }

  listAllCompanies(){
    console.log("listAllCompanies");
    this.companyService.getAllCompanies(this.page).subscribe(data =>{
      this.companies = data['content'];
      console.log(this.companies);
    },
    (error)=>{
      console.log(error.error.message);
    })
  }

  submitForm(){
    this.company = this.form.value.selectedCompany;
    console.log(this.company);
    this.associateUserToACompany(this.company, this.currentUser);
  }

  associateUserToACompany(companyId :number, user : Usuario){
    console.log(this.company);
    this.companyService.associateUserToCompany(companyId, user).subscribe(data=>{
      this._snackBar.open('Te has asociado con la empresa, recarga la página para ver más', '', {
        duration: 15000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      this.router.navigateByUrl("dashboard/user/"+user.id);
    })
  }

}
