import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  artistCurrentString: any;
  playlist: any;
  playlisttemp: any;
  playlistdataArray: any;
  coldown: any = false;
  title = 'app';
  cont: any = 10;
  view: any;
  index: any;
  contSongs: any;


  constructor(private session: SessionService, private player: PlayerService) {

    setInterval(() => { this.artistCurrent(); }, 1000);
    setInterval(() => { this.playlistCurrent(); }, 1000);
    setInterval(() => { this.refresh(); }, 1000);
    this.setfirst(0);

    setInterval(() => {
      if (this.playlist) {
      if (this.playlist[0] !== this.artistCurrentString) { console.log("Entra index"); this.indexfirst(); }}
    }, 1300);
    this.playlistdata();
    if (this.coldown == true) {
      this.cont = 10;
      setInterval(() => {
        this.cont--; if (this.cont == 0) {
          this.coldown = false
          this.cont = 10
        }
      }, 1500);
    }
  }

  logout() {
    this.session.logout().subscribe();
  }
  destroySession(user) {
    console.log("Usuario---->", user);
    this.session.destroySession(user).subscribe();
  }
  nextSong() {
    this.player.nextSong().subscribe();
  }
  previousSong() {
    this.player.previousSong().subscribe();
  }
  pause() {
    this.player.pause().subscribe();
  }
  play() {
    this.player.play().subscribe();
  }
  refresh() {
    this.player.refresh().subscribe((cont) => this.contSongs = cont.index);
  }
  artistCurrent() {
    this.player.artistCurrent().subscribe((artistCurrent) => this.artistCurrentString = artistCurrent.artistCurrent);
  }
  playlistCurrent() {
    this.player.playlistCurrent().subscribe((arrayPlaylist) => this.playlist = arrayPlaylist.arrayPlaylist);
  }
  playlistdata() {
    this.player.playlistdata().subscribe((array) => this.playlistdataArray = array);
  }
  reorder(i) {
    this.view = ""
    this.coldown = true;

    this.player.reorder(i).subscribe((cont) => this.contSongs = cont.index);
  }

  setfirst(i) {

    this.player.setfirst(i).subscribe((cont) => this.contSongs = cont.index);
  }
  timer() {
    this.coldown = true;
    if (this.coldown == true) {
      this.cont = 10;
      let time = setInterval(() => {
        this.cont--; if (this.cont == 0) {
          this.coldown = false;
          this.cont = 10;
          clearInterval(time);
        }
      }, 1000);
    }
  }

  indexfirst() {
    this.index = this.playlist.indexOf(this.artistCurrentString);
    console.log(this.index);
    this.setfirst(this.index);
  }

  ngOnInit() {

  }

}
