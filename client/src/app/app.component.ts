import { Component } from '@angular/core';
import { SessionService } from '../services/session.service';
import { PlayerService } from '../services/player.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public session: SessionService) {

  }
  logout() {
    this.session.logout().subscribe();
  }
  destroySession(user) {
    console.log("Usuario---->", user);
    this.session.destroySession(user).subscribe();
  }
}
