import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { RestapiService } from 'src/app/services/restapi.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  form : FormGroup;
  usuario : Usuario;
  url : String;
  decodedJWT : any;
  logUser : String;

  constructor( private fb : FormBuilder, private _snackBar: MatSnackBar, private router: Router, private userService : UsersService, private restapi : RestapiService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      phone: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      jobTitle: [''],
      description: [''],
      openToWork: [''],
      publicable:['']
    })
  }

  ngOnInit(): void {
    this.decodedJWT = this.restapi.userLogged();
    console.log(this.decodedJWT);
    this.logUser = this.decodedJWT.sub;
    if(this.decodedJWT){
      this.userService.getUserByUsername(this.logUser).subscribe(data => {
        this.usuario = data;
      });
    }
  }

  updateUser(){
    this.usuario = this.form.value;
    //console.log(this.usuario);
    this.userService.updateUser(this.usuario.id, this.usuario).subscribe(data => {
      this.router.navigateByUrl("login");
    },
    (error) => {
      this._snackBar.open('Ha habido un error a la hora de actualizar el usuario.', '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
    });
  }
  );
  }

}
