import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Company } from 'src/app/interfaces/company';
import { Usuario } from 'src/app/interfaces/usuario';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  currentUser: Usuario;

  form: FormGroup;
  company : Company;

  constructor(private fb : FormBuilder,
    private companyService : CompanyService,
    private _snackBar : MatSnackBar,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.currentUser = data.currentUser
     }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      field: ['',Validators.required],
      logo: ['', Validators.required],
      hiring: ['', Validators.required],
      idAdmin: [''],
      nameAdmin: ['', Validators.required]
    });
    this.form.controls['idAdmin'].setValue(this.currentUser.id);
    this.form.controls['nameAdmin'].setValue(this.currentUser.name + ' ' + this.currentUser.surname);
    console.log(this.form.value);
  }

  newCompany(){
    this.company = this.form.value;
    console.log(this.company);
    this.companyService.createNewCompanie(this.company).subscribe(data =>{
      this._snackBar.open('Se ha creado la nueva empresa '+ this.company.name, '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
    });
      this.router.navigateByUrl("dashboard");
    })
  }

}
