import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/interfaces/Reservations/reservation';
import { Room } from 'src/app/interfaces/room';
import { Usuario } from 'src/app/interfaces/usuario';
import { ReservationsService } from 'src/app/services/reservations.service';
import { RoomsService } from 'src/app/services/rooms.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.css']
})
export class TabBarComponent implements OnInit {

  usersList : Usuario[];
  columnsToDisplayUser = ['id','name','surname','email','phone','partner','username','openToWork','jobTitle','publicable','description'];

  totalUsers;

  user : Usuario;
  page : number = 0;

  roomList : Room[];
  
  reservationList : Reservation[];

  constructor(private reservationService : ReservationsService, private userService : UsersService, private roomService : RoomsService) {}

  ngOnInit(): void {
    this.listAllRooms();
    this.listAllUsers();
  }

  listAllRooms(){
    this.roomService.getAllRooms(this.page).subscribe(data => {
      this.roomList = data['content'];
    },
    (error) => {
      console.log(error.error.message);
    }
    )
  }

  listAllUsers(){
    this.userService.getAllUsers().subscribe(data => {
      this.usersList = data['content'];
      this.totalUsers = this.usersList.length;
    },
    (error) => {
      console.log(error.error.message);
    }
    )
  }

  listAllReservations(){

  }

  OnPageChange(event : any){
    this.page = event.pageIndex;
    console.log(this.page);
    this.userService.getAllUsers().subscribe(data => {
      this.usersList = data['content'];
      this.totalUsers = this.usersList.length;
    },
    (error) => {
      console.log(error.error.message);
    }
    )
  }

}
