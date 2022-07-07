import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    private reservationService: ReservationsService,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb : FormBuilder) {
      this.currentUser = data.currentUser
     }

  ngOnInit(): void {
    this.form = this.fb.group({
      user: [''],
      date: ['', Validators.required]
    });
    this.form.controls['user'].setValue(this.currentUser);
    console.log(this.form.value);
  }

  newAppointment(){
    this.appointment = this.form.value;
    console.log(this.appointment);
    this.reservationService.addAppointment(this.appointment).subscribe(data => {
      this._snackBar.open('Se ha creado la visita presencial para la fecha '+ this.form.value.date +', aparecerá en el apartado de "mis reservas"', '', {
        duration: 15000,
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
