import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/interfaces/room';
import { RestapiService } from 'src/app/services/restapi.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  room : Room;
  
  constructor(private fb : FormBuilder, private route : ActivatedRoute, private service : RestapiService) { 
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = <number>params['id'];
      if(id != null){
        this.service.getRoom(id).subscribe(data => {
          this.room = data;
        });
      }
    });
  }
}
