import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/interfaces/room';
import { RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  page : number = 0;
  rooms : Room[];
  room : Room;

  constructor(private http : HttpClient, 
    private roomService : RoomsService) { }

  ngOnInit(): void {
    this.listAllRooms();
  }

  listAllRooms(){
    this.roomService.getAllRooms(this.page).subscribe(data => {
      this.rooms = data['content'];
    },
    (error) => {
      console.log(error.error.message);
    }
    )
  }

}
