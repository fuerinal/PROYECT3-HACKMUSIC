import { Component } from '@angular/core';
import { SessionService } from '../services/session.service';
import { PlayerService } from '../services/player.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  artistCurrentString: any;
  playlist: any;
  playlisttemp: any;
  coldown: any = false;
  title = 'app';
  cont: any = 10;
  view:any;
  index:any;

  constructor(private session: SessionService, private player: PlayerService) {

    setInterval(() => { this.artistCurrent(); }, 1000);
    setInterval(() => { this.playlistCurrent(); }, 1000);

    setInterval(() => { if(this.playlist[0]!==this.artistCurrentString){this.indexfirst(); }}, 1500);



    if (this.coldown == true) {
      this.cont = 10;

      setInterval(() => {
      this.cont--; if (this.cont == 0) {
        this.coldown = false
        this.cont = 10
      }
      }, 1000);


    }


  }

  logout() {
    this.session.logout().subscribe();
  }
  destroySession(user){
    console.log("Usuario---->",user);
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
  artistCurrent() {
    this.player.artistCurrent().subscribe((artistCurrent) => this.artistCurrentString = artistCurrent.artistCurrent);
  }
  playlistCurrent() {
    this.player.playlistCurrent().subscribe((arrayPlaylist) => this.playlist = arrayPlaylist.arrayPlaylist);

  }
  reorder(i) {
    this.view=""
    this.coldown = true;
    console.log(i);
    this.player.reorder(i).subscribe();

  }

  setfirst(i) {

    this.player.setfirst(i).subscribe();
  }
  timer() {
    this.coldown=true;
    if (this.coldown == true) {
      this.cont = 10;
      let time=setInterval(() => {
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
  // unshift(i){
  //   console.log(i);
  //       this.playlisttemp.splice(i, 1);
  // }
  // resetplaylist(i){
  //   this.playlist=this.playlisttemp;
  //
  // }


}
