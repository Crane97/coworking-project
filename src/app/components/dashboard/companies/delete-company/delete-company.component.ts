import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Company } from 'src/app/interfaces/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-delete-company',
  templateUrl: './delete-company.component.html',
  styleUrls: ['./delete-company.component.css']
})
export class DeleteCompanyComponent implements OnInit {

  company : Company;

  constructor(private companyService : CompanyService,
    @Inject(MAT_DIALOG_DATA) public data,
    private _snackBar : MatSnackBar
  ) { 
    this.company = data.company;
  }

  ngOnInit(): void {
  }

  deleteCompany(){
    this.companyService.deleteCompany(this.company.id).subscribe(data =>{
      this._snackBar.open('Se ha eliminado la empresa correctamente.', '', {
        duration: 10000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    },
    (error) => {
      this._snackBar.open('Ha habido un error a la hora de eliminar la empresa.', '', {
        duration: 10000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    })
  }

}
