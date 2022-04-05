import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RestapiService } from 'src/app/restapi.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form : FormGroup
  loading = false;
  username!: string;
  password!: string;
  errormessage!: string;

  constructor(private fb : FormBuilder, private _snackBar: MatSnackBar, private router: Router, private service : RestapiService) {
    this.form = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]

    })
   }

  ngOnInit(): void {
  }

  doLogin() {
    this.service.login(this.form.value.user, this.form.value.password).subscribe(data => {
      //this.message = data.accesstoken;
      localStorage.setItem("JWTtoken", data.accesstoken);
      this.router.navigateByUrl("dashboard");
      //console.log(data);
    },
    (error) => {
      console.log(error.error.message);
      this.errormessage="Wrong credentials";
    }
  );
  }

  doLogin1() {
    console.log(this.form);
    this.username = this.form.value.user;
    this.password = this.form.value.password;
    this.service.login(this.username, this.password).subscribe(data => {
      //this.message = data.accesstoken;
      localStorage.setItem("JWTtoken", data.accesstoken);
      this.router.navigateByUrl("dashboard");
      //console.log(data);
    },
    (error) => {
      console.log(error.error.message);
      this.errormessage="Wrong credentials";
    }
  );
  }
/*
  ingresar(){
    console.log(this.form);
    const user = this.form.value.user;
    const password = this.form.value.password;

    if(user == "jorge" && password =="admin123"){
      //TODO: Redireccionamos al dashboard
      this.fakeLoading();
    }
    else {
      //TODO: Mostramos mensaje de error
      this.error();
      this.form.reset();
    }
  }

  error(){
    this._snackBar.open('El nombre de usuario o la contraseña son incorrectos.', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  fakeLoading(){
    this.loading = true;
    setTimeout(() => {

      this.router.navigate(['dashboard'])
    }, 1500);
  }*/

}
