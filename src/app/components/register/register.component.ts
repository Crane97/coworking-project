import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { RestapiService } from 'src/app/services/restapi.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form : FormGroup;
  usuario : Usuario;

  constructor(private fb : FormBuilder, private _snackBar: MatSnackBar, private router: Router, private service : RestapiService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      phone: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      jobTitle: [''],
      description: ['']
    })
   }

  ngOnInit(): void {
  }

  doRegister(){
    this.usuario = this.form.value;
    console.log(this.usuario);
    this.service.createUser(this.usuario).subscribe();
    this.router.navigateByUrl("login");
  }

  backLogin(){
    this.router.navigateByUrl("login");
  }

}
