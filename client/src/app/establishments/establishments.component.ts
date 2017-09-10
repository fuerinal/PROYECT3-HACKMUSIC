import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';

@Component({
  selector: 'app-establishments',
  templateUrl: './establishments.component.html',
  styleUrls: ['./establishments.component.css']
})
export class EstablishmentsComponent implements OnInit {
playlistdataArray :any;
  constructor(private playlist: PlaylistService) {
    this.playlistdata();
  }

  ngOnInit() {
  }
  playlistdata() {
      this.playlist.playlistdata().subscribe((array) => this.playlistdataArray = array);
  }
}
