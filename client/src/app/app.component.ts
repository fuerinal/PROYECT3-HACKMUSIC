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
  playlist:any;
  playlisttemp:any;
  title = 'app';

  constructor(private session:SessionService,private player:PlayerService){
    setInterval(() => { this.artistCurrent(); }, 1000);
    setInterval(() => { this.playlistCurrent(); }, 1000);


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
      this.player.playlistCurrent().subscribe((arrayPlaylist) => this.playlist = arrayPlaylist.arrayPlaylist);

  }
  reorder(i){
    console.log(i);
    this.player.reorder(i).subscribe();
  }

  setfirst(i){
    console.log(i);
    this.player.setfirst(i).subscribe();
  }


index(){
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
