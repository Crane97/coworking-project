import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  user : Usuario;

  constructor(private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data, private userService : UsersService) {
    this.user = data.user;
   }

  ngOnInit(): void {
  }

  deleteUser(userid : number){
    this.userService.deleteUser(userid).subscribe(data=>{
      this._snackBar.open('Se ha eliminado el usuario '+ userid+' correctamente. Refresca la página para confirmarlo.')
    })
  }

}
