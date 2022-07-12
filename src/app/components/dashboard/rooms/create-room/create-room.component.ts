import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Room } from 'src/app/interfaces/room';
import { RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  form: FormGroup;
  room : Room;

  constructor(private fb : FormBuilder,
    private _snackBar : MatSnackBar,
    private roomService : RoomsService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      capacity: ['',Validators.required],
      roomType: ['', Validators.required],
      coverImage: ['', Validators.required],
    });
  }

  addRoom(){
    this.room = this.form.value;
    this.roomService.addRoom(this.room).subscribe(data => {
      this._snackBar.open('Se ha creado la nueva sala '+ this.room.name, '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
    });
    })
  }

}
