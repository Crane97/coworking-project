import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { RestapiService } from 'src/app/services/restapi.service';
import { UsersService } from 'src/app/services/users.service';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuario : Usuario;

  constructor(private route : ActivatedRoute, 
    private userService : UsersService,
    private dialogRef : MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = <number>params['id'];
      if(id != null){
        this.userService.getUser(id).subscribe(data => {
          this.usuario = data;
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

}
