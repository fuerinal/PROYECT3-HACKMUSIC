import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';
@Injectable()

export class SpotifyUserService {

  startLoginCompleted: boolean = false;
  BASE_URL: string = `${environment.BASE_URL}/api/spotifyauth`;
  cont:any;

  constructor(public http: Http) {

  }

  login(): Observable<any> {

    return this.http.get(`${this.BASE_URL}/login/spotify`)

  }
  loginreturn(): Observable<any> {

    return this.http.get(`${this.BASE_URL}/login/spotify/return`)
      .map(res => res.json())
  }


  // reorder(i: any): Observable<any> {
  //   console.log("Entra en el servicio");
  //   console.log(i, "service");
  //   return this.http.post(`${this.BASE_URL}/reorder`, { i })
  //     .map(res => {
  //       this.cont=res.json();
  //       return this.cont
  //     })
  // }

}
