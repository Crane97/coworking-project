import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu.service';
import { RestapiService } from 'src/app/services/restapi.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menus : Menu[] = [];
  isLogged : Boolean = false;

  constructor(private _menuService : MenuService, private restapi: RestapiService) { }

  ngOnInit(): void {
    this.cargarMenu();
    this.restapi.getTokenInfo();
  }

  cargarMenu(){
    this._menuService.getMenu().subscribe(data => {
      this.menus = data;
    })
  }

}
