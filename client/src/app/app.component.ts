import { Component } from '@angular/core';
import { SessionService } from '../services/session.service';
import { PlayerService } from '../services/player.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  artistCurrentString:any;
  title = 'app';

  constructor(private session:SessionService,private player:PlayerService){
    setInterval(() => { this.artistCurrent(); }, 1000);
  }

  logout(){
    this.session.logout().subscribe();
  }
  nextSong(){
    this.player.nextSong().subscribe();
  }
  previousSong(){
    this.player.previousSong().subscribe();
  }
  pause(){
    this.player.pause().subscribe();
  }
  play(){
    this.player.play().subscribe();
  }
  artistCurrent(){
    this.player.artistCurrent().subscribe((artistCurrent) => this.artistCurrentString = artistCurrent.artistCurrent);
  }
  playlistCurrent(){
      this.player.playlistCurrent().subscribe();

  }


}
