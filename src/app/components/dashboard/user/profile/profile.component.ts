import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Role } from 'src/app/interfaces/role';
import { Usuario } from 'src/app/interfaces/usuario';
import { PaymentService } from 'src/app/services/payment.service';
import { RestapiService } from 'src/app/services/restapi.service';
import { UsersService } from 'src/app/services/users.service';
import { SelectCompanyComponent } from '../../companies/select-company/select-company.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuario : Usuario;
  partnered : boolean;

  constructor(private route : ActivatedRoute, 
    private userService : UsersService,
    private dialogRef : MatDialog,
    private paymentService : PaymentService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = <number>params['id'];
      if(id != null){
        this.userService.getUser(id).subscribe(data => {
          this.usuario = data;
          console.log(this.usuario);
          this.partnered = this.usuario.partner
        });
      }
    });
  }

  closeAccount(userPop : Usuario){
    this.dialogRef.open(DeleteUserComponent,{
      data:{
        user : userPop
      }
      });
  }

  openSelectCompany(currentUser : Usuario){
    this.dialogRef.open(SelectCompanyComponent,{
      data:{
        currentUser : currentUser
      }
    });
  }

  openPortal(){
    this.paymentService.createPortal(this.usuario).subscribe( data => {
      console.log(data);
      console.log(data['url']);
      window.location.href=data['url'];
    })
  }

}
