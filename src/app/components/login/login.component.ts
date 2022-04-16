import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RestapiService } from 'src/app/services/restapi.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form : FormGroup
  username!: string;
  password!: string;
  errormessage!: string;

  constructor(private fb : FormBuilder, private _snackBar: MatSnackBar, private router: Router, private service : RestapiService) {
    this.form = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],

    })
   }

  ngOnInit(): void {
  }

  doLogin() {
    this.service.login(this.form.value.user, this.form.value.password).subscribe(data => {
      //this.message = data.accesstoken;
      localStorage.setItem("JWTtoken", data.access_token);
      this.router.navigateByUrl("dashboard");
      //console.log(data);
    },
    (error) => {
      this._snackBar.open('El nombre de usuario o la contraseña son incorrectos.', '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  );
  }
}
