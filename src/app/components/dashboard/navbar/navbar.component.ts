import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu.service';
import { RestapiService } from 'src/app/services/restapi.service';
import * as jwt_decode from 'jwt-decode';
import { Usuario } from 'src/app/interfaces/usuario';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menus : Menu[] = [];
  decodedJWT : any;
  currentUser : Usuario;
  logUser : String;
  isLogged : Boolean = false;

  constructor(private _menuService : MenuService, private restapi: RestapiService) { }

  ngOnInit(): void {
    this.decodedJWT = this.restapi.userLogged();
    console.log(this.decodedJWT);
    if(this.decodedJWT){
      this.isLogged = true;
      this.logUser = this.decodedJWT.sub;
      this.restapi.getUserByUsername(this.logUser).subscribe(data => {
        this.currentUser = data;
      });
    }
    this.cargarMenu();
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
