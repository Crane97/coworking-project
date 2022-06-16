import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/interfaces/company';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  page : number = 0;
  companies : Company[];
  company : Company;


  constructor(private http : HttpClient,
    private companyService : CompanyService) { }

  ngOnInit(): void {
    this.listAllCompanies();
  }

  listAllCompanies(){
    this.companyService.getAllCompanies(this.page).subscribe(data =>{
      this.companies = data['content'];
    },
    (error)=>{
      console.log(error.error.message);
    })
  }

}
