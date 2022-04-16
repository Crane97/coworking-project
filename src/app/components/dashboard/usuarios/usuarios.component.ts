import { Component, Inject, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { HttpClient } from '@angular/common/http';
import { RestapiService } from 'src/app/services/restapi.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  page : number = 0;
  usuarios : Usuario[];
  usuario : Usuario;
  
  constructor(private http : HttpClient, private service : RestapiService) { }

  ngOnInit(): void {
    this.listAllUsers();
  }

  listAllUsers(){
    this.service.getAllUsers(this.page).subscribe(data => {
      this.usuarios = data['content'];
    },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

}
