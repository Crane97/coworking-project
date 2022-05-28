import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Room } from 'src/app/interfaces/room';
import { RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'app-delete-room',
  templateUrl: './delete-room.component.html',
  styleUrls: ['./delete-room.component.css']
})
export class DeleteRoomComponent implements OnInit {

  room : Room;

  constructor(private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data, private roomService : RoomsService) {
    this.room = data.room;
   }

  ngOnInit(): void {
  }

  deleteRoom(roomid : number){
    this.roomService.deleteRoom(roomid).subscribe(data =>{
      this._snackBar.open('Se ha eliminado la sala ' + roomid + ' correctamente. Recarga la página para comprobarlo');
    });
  }
}
