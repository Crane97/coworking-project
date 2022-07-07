import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { Role } from 'src/app/interfaces/role';
import { Usuario } from 'src/app/interfaces/usuario';
import { CompanyService } from 'src/app/services/company.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RestapiService } from 'src/app/services/restapi.service';
import { UsersService } from 'src/app/services/users.service';
import { AdminSwapComponent } from '../../companies/admin-swap/admin-swap.component';
import { SelectCompanyComponent } from '../../companies/select-company/select-company.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  partnered: boolean;

  isCompanyAdmin : boolean = false  ;

  constructor(private route: ActivatedRoute,
    private userService: UsersService,
    private dialogRef: MatDialog,
    private paymentService: PaymentService,
    private companyService: CompanyService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = <number>params['id'];
      if (id != null) {
        this.userService.getUser(id).subscribe(data => {
          this.usuario = data;
          console.log(this.usuario);
          this.partnered = this.usuario.partner;
        if(this.usuario.id == this.usuario.company.idAdmin){
          this.isCompanyAdmin = true;
          console.log("Estoy en el isCompanyAdmin");
        }
        });
      }
    });
  }

  closeAccount(userPop: Usuario) {
    this.dialogRef.open(DeleteUserComponent, {
      data: {
        user: userPop
      }
    });
  }

  openSelectCompany(currentUser: Usuario) {
    this.dialogRef.open(SelectCompanyComponent, {
      data: {
        currentUser: currentUser
      }
    });
  }

  openPortal() {
    this.paymentService.createPortal(this.usuario).subscribe(data => {
      console.log(data);
      console.log(data['url']);
      window.location.href = data['url'];
    })
  }

  disassociateUserToCompany() {
    this.companyService.disassociateUserToCompany(this.usuario.company.id, this.usuario).subscribe(data => {
      this._snackBar.open('Te has dado de baja de la empresa ' + this.usuario.company.name, '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    },
      (error) => {
        this._snackBar.open('No puedes darte de baja porque eres el administrador de ' + this.usuario.company.name + ', porfavor, pasa el administrador a un compañero o habla con uno de los administradores de la web.', '', {
          duration: 10000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      })
  }

  adminSwap(currentUser: Usuario){
    this.dialogRef.open(AdminSwapComponent, {
      data: {
        currentUser: currentUser
      }
    });
  }

}
