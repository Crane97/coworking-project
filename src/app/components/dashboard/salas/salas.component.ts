import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/interfaces/room';
import { RestapiService } from 'src/app/services/restapi.service';

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css']
})
export class SalasComponent implements OnInit {

  page : number = 0;
  rooms : Room[];
  room : Room;

  constructor(private http : HttpClient, private service : RestapiService) { }

  ngOnInit(): void {
    this.listAllRooms();
  }

  listAllRooms(){
    this.service.getAllRooms(this.page).subscribe(data => {
      this.rooms = data['content'];
      console.log(data);
      console.log(this.rooms[1]);
      console.log(this.rooms);
    },
    (error) => {
      console.log(error.error.message);
    }
    )
  }

}
