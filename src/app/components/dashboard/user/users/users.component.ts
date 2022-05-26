import { Component, Inject, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { HttpClient } from '@angular/common/http';
import { RestapiService } from 'src/app/services/restapi.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usuarios : Usuario[];
  usuario : Usuario;
  
  constructor(private http : HttpClient, private userService : UsersService) { }

  ngOnInit(): void {
    this.listAllUsers();
  }

  listAllUsers(){
    this.userService.getPublicableUsers().subscribe(data => {
      this.usuarios = data['content'];
    },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

}
