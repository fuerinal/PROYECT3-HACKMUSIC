import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-establishments',
  templateUrl: './establishments.component.html',
  styleUrls: ['./establishments.component.css']
})
export class EstablishmentsComponent implements OnInit {
playlistdataArray :any;
  constructor(private player: PlayerService) {
    this.playlistdata();
  }

  ngOnInit() {
  }
  playlistdata() {
      this.player.playlistdata().subscribe((array) => this.playlistdataArray = array);
  }
}
