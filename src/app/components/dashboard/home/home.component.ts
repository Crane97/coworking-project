import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from 'src/app/interfaces/usuario';
import { RestapiService } from 'src/app/services/restapi.service';
import { UsersService } from 'src/app/services/users.service';
import { RegisterComponent } from '../../register/register.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  decodedJWT : any;
  logUser : String;
  isLogged : Boolean = false;
  currentUser : Usuario;

  constructor(private dialogRef: MatDialog, private userService : UsersService, private restapi : RestapiService) { }

  ngOnInit(): void {
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

  openRegister(){
    this.dialogRef.open(RegisterComponent);
  }

}
