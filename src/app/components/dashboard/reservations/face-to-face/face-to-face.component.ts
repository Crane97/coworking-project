import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { ReservationsService } from 'src/app/services/reservations.service';
import { RestapiService } from 'src/app/services/restapi.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-face-to-face',
  templateUrl: './face-to-face.component.html',
  styleUrls: ['./face-to-face.component.css']
})
export class FaceToFaceComponent implements OnInit {

  decodedJWT: any;
  logUser: String;
  currentUser: Usuario;
  form: FormGroup;

  appointment: any; 

  constructor(private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private reservationService: ReservationsService,
    private restapi: RestapiService,
    private userService: UsersService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = <number>params['id'];
      if (id != null) {
        this.form = this.fb.group({
          date: [''],
          user: [''],
        });
        this.decodedJWT = this.restapi.userLogged();
        console.log(this.decodedJWT);
        if (this.decodedJWT) {
          this.logUser = this.decodedJWT.sub;
          this.userService.getUserByUsername(this.logUser).subscribe(data => {
            this.currentUser = data;
            console.log(this.currentUser);
            this.form.controls['user'].setValue(this.currentUser);
          });
        }
      }
    });
  }

  newAppointment(){
    this.appointment = this.form.value;
    this.reservationService.addAppointment(this.appointment).subscribe(data => {
      this._snackBar.open('Se ha creado la visita presencial correctamente', '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
        //this.router.navigateByUrl("login"); que te enlace a mis reservas
      });
    })
  }

  getCurrentDate(event){
    console.log("getCurrentDate");
  }

}
