import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
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
  constructor(private session: SessionService) { }
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

  signup() {
    this.session.signup(this.username, this.password)
      .subscribe(
        (user) => console.log(user),
        (err) => this.error = err
      );
  }

}
