import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../services/session.service';
import { PlayerService } from '../services/player.service';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomeComponent } from './home/home.component';
import { routes } from './routes';
import { RouterModule } from '@angular/router';
import { EstablishmentsComponent } from './establishments/establishments.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HomeComponent,
    EstablishmentsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
  ],
  providers: [SessionService,PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule {}
