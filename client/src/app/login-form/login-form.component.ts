import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { SpotifyUserService } from '../../services/spotify-user.service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  error: string;
  username:string;
  password:string;
  bool:boolean=true;
  constructor(public session: SessionService,public loginSpotify: SpotifyUserService) { }
  ngOnInit() {
  }
toggle(){
  this.bool = this.bool ? false : true;
}
  login() {
    this.session.login(this.username,this.password)
      .subscribe(
        (user) => console.log(user),
        (err) => this.error = err
      );
  }
  loginWithSpotify() {
    this.loginSpotify.login().subscribe();
    this.loginSpotify.loginreturn().subscribe();

  }



  signup() {
    this.session.signup(this.username, this.password)
      .subscribe(
        (user) => console.log(user),
        (err) => this.error = err
      );
  }

}
