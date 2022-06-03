import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { PaymentService } from 'src/app/services/payment.service';
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

  priceId : string = "price_1L4jmzEbpLL7D6KIOT0Mooza";

  constructor(private dialogRef: MatDialog, 
    private userService : UsersService, 
    private restapi : RestapiService,
    private paymentService : PaymentService,
    private router : Router) { }

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

  newPartnership(){
    this.paymentService.createSubscription(this.priceId).subscribe(data =>{
      console.log(data);
      //const aux = JSON.parse(data);
      console.log(data['url']);
      window.location.href=data['url'];
    })
  }

}
