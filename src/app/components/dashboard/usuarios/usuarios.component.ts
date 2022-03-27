import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';

const ELEMENT_DATA: Usuario[] = [
  {usuario: 'jperez', nombre: 'Juan', apellido: 'Perez', sexo: 'H'},
  {usuario: 'jorge', nombre: 'Jorge', apellido: 'Ruiz de la Torre', sexo: 'H'},
  {usuario: 'alberto', nombre: 'Alberto', apellido: 'Monforte', sexo: 'M'}
]

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ['usuario', 'nombre', 'apellido', 'sexo', 'acciones'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
