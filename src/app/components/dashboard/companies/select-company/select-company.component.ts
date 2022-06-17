import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  company : Company;

  form: FormGroup;

  decodedJWT : any;
  logUser : String;
  isLogged : Boolean = false;
  currentUser : Usuario;

  constructor(private http : HttpClient,
    private fb : FormBuilder,
    private companyService : CompanyService,
    private restapi : RestapiService,
    private userService : UsersService) { }

  ngOnInit(): void {
    this.listAllCompanies;
    this.getCurrentUser;
    this.form = this.fb.group({
      selectedCompany: ['', Validators.required]
    });
  }

  listAllCompanies(){
    this.companyService.getAllCompanies(this.page).subscribe(data =>{
      this.companies = data['content'];
      console.log(this.companies);
    },
    (error)=>{
      console.log(error.error.message);
    })
  }

  getCurrentUser(){
    this.decodedJWT = this.restapi.userLogged();
    console.log(this.decodedJWT);
    if(this.decodedJWT){
      this.isLogged = true;
      this.logUser = this.decodedJWT.sub;
      this.userService.getUserByUsername(this.logUser).subscribe(data => {
        this.currentUser = data;
      });
    }
  }

  submitForm(){
    this.company = this.form.value;
    console.log(this.company);
    this.associateUserToACompany(this.company.id, this.currentUser);
  }

  associateUserToACompany(companyId :number, user : Usuario){
    console.log(this.company);
    this.companyService.associateUserToCompany(companyId, user).subscribe(data=>{

    })
  }

}
