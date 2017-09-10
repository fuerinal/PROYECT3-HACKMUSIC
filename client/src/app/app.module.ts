import { MaterializeModule } from "angular2-materialize";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../services/session.service';
import { PlayerService } from '../services/player.service';
import { SpotifyUserService } from '../services/spotify-user.service';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomeComponent } from './home/home.component';
import { routes } from './routes';
import { RouterModule } from '@angular/router';
import { EstablishmentsComponent } from './establishments/establishments.component';
import { HomeUserSpotifyComponent } from './home-user-spotify/home-user-spotify.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HomeComponent,
    EstablishmentsComponent,
    HomeUserSpotifyComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    MaterializeModule
  ],
  providers: [SessionService,PlayerService,SpotifyUserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
