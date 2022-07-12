import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Company } from 'src/app/interfaces/company';
import { Reservation } from 'src/app/interfaces/Reservations/reservation';
import { Room } from 'src/app/interfaces/room';
import { Usuario } from 'src/app/interfaces/usuario';
import { CompanyService } from 'src/app/services/company.service';
import { ReservationsService } from 'src/app/services/reservations.service';
import { RestapiService } from 'src/app/services/restapi.service';
import { RoomsService } from 'src/app/services/rooms.service';
import { UsersService } from 'src/app/services/users.service';
import { DeleteReservationComponent } from '../../dashboard/reservations/delete-reservation/delete-reservation.component';
import { CreateRoomComponent } from '../../dashboard/rooms/create-room/create-room.component';
import { DeleteUserComponent } from '../../dashboard/user/delete-user/delete-user.component';
import { RegisterComponent } from '../../register/register.component';
import { DeleteRoomComponent } from '../delete-room/delete-room.component';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.css']
})
export class TabBarComponent implements OnInit {

  usersList: Usuario[];
  columnsToDisplayUser = ['id', 'name', 'surname', 'email', 'phone', 'partner', 'username', 'openToWork', 'jobTitle', 'publicable', 'description', 'Editar', 'Eliminar'];
  totalUsers;

  user: Usuario;
  page: number = 0;

  roomList: Room[];
  columnsToDisplayRoom = ['id', 'name', 'capacity', 'roomType', 'Editar', 'Eliminar'];
  totalRooms;

  reservationList: Reservation[];
  columnsToDisplayReservation = ['id', 'description', 'date', 'start', 'end', 'status', 'place', 'user', 'room', 'Editar', 'Eliminar'];
  totalReservations;

  companiesList: Company[];
  columnsToDisplayCompanies = ['id', 'name', 'workers', 'field', 'logo', 'hiring', 'idAdmin', 'nameAdmin', 'Editar', 'Eliminar'];
  totalCompanies;

  decodedJWT: any;
  logUser: String;
  isLogged: Boolean = false;
  idLogged: String;
  currentUser: Usuario;

  isAdmin: boolean = false;

  constructor(private dialogRef: MatDialog,
    private reservationService: ReservationsService,
    private userService: UsersService,
    private roomService: RoomsService,
    private restapi: RestapiService,
    private companyService: CompanyService) { }

  ngOnInit(): void {
    this.decodedJWT = this.restapi.userLogged();
    console.log(this.decodedJWT);
    if (this.decodedJWT) {
      this.isLogged = true;
      this.logUser = this.decodedJWT.sub;
      console.log(this.logUser);
      this.userService.getUserByUsername(this.logUser).subscribe(data => {
        this.currentUser = data;
        if (this.decodedJWT.roles[0] == "ROLE_ADMIN") {
          this.isAdmin = true;
          this.listAllRooms();
          this.listAllUsers();
          this.listAllReservations();
          this.listAllCompanies();
        }
      });
    }
  }

  listAllRooms() {
    this.roomService.getAllRooms(this.page).subscribe(data => {
      this.roomList = data['content'];
      this.totalRooms = this.roomList.length;
    },
      (error) => {
        console.log(error.error.message);
      }
    )
  }

  listAllUsers() {
    this.userService.getAllUsers(this.page).subscribe(data => {
      this.usersList = data['content'];
      this.totalUsers = this.usersList.length;
    },
      (error) => {
        console.log(error.error.message);
      }
    )
  }

  listAllReservations() {
    this.reservationService.getAllReservations().subscribe(data => {
      this.reservationList = data;
      this.totalReservations = this.reservationList.length;
      console.log(this.reservationList);
    },
      (error) => {
        console.log(error.error.message);
      }
    )
  }

  listAllCompanies() {
    this.companyService.getAllCompanies(this.page).subscribe(data => {
      this.companiesList = data['content'];
      this.totalCompanies = this.companiesList.length;
      console.log(this.companiesList);
    },
      (error) => {
        console.log(error.error.message);
      }
    )
  }

  deleteRoom(roomPop: Room) {
    this.dialogRef.open(DeleteRoomComponent, {
      data: {
        room: roomPop
      }
    })
  }

  deleteReservation(reservationPop: Reservation) {
    this.dialogRef.open(DeleteReservationComponent, {
      data: {
        reservation: reservationPop
      }
    })
  }

  deleteCompany(company : Company){

  }

  editCompany(company : Company){

  }

  addUser() {
    this.dialogRef.open(RegisterComponent);
  }

  deleteUser(userPop: Usuario) {
    this.dialogRef.open(DeleteUserComponent, {
      data: {
        user: userPop
      }
    })
  }

  addRoom(){
    this.dialogRef.open(CreateRoomComponent)
  }

}
