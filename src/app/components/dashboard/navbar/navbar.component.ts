import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu.service';
import { RestapiService } from 'src/app/services/restapi.service';
import * as jwt_decode from 'jwt-decode';
import { Usuario } from 'src/app/interfaces/usuario';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menus : Menu[] = [];
  decodedJWT : any;
  currentUser : Usuario = {
    id : 0,
    name : 'null',
    surname : 'null',
    email : 'null',
    phone : 'null',
    partner : false,
    username : 'null',
    password : 'null',
    openToWork : false,
    jobTitle : 'null',
    customer : 'null',
    publicable : false,
    description : 'null',
    roles : null,
    reservation : null,
    company : null,
  };
  logUser : String;
  isLogged : Boolean = false;
  idLogged : String;

  constructor(private _menuService : MenuService, private restapi: RestapiService, private userService : UsersService) { }

  ngOnInit(): void {
    this.cargarMenu();
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

  cargarMenu(){
    this._menuService.getMenu().subscribe(data => {
      this.menus = data;
    })
  }

  logout(){
    this.restapi.logout();
    this.isLogged = false;
  }

}
