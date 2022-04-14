import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { RestapiService } from 'src/app/services/restapi.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuario : Usuario;

  constructor(private route : ActivatedRoute, private service : RestapiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = <number>params['id'];
      if(id != null){
        this.service.getUser(id).subscribe(data => {
          console.log(data);
          this.usuario = data;
        });
      }
    });
  }

}
