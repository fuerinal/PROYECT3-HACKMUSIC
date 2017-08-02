import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';
@Injectable()

export class PlayerService {
  
  startLoginCompleted: boolean = false;
  BASE_URL: string = `${environment.BASE_URL}/api/spotify`;

  constructor(private http: Http) {

  }

  nextSong(): Observable<any> {
    console.log("Entra en el servicio");
    return this.http.get(`${this.BASE_URL}/nextSong`)
      .map(res => {
        res.json();
      })
  }
  previousSong(): Observable<any> {
    console.log("Entra en el servicio");
    return this.http.get(`${this.BASE_URL}/previousSong`)
      .map(res => {
        res.json();
      })
  }
  pause(): Observable<any> {
    console.log("Entra en el servicio");
    return this.http.get(`${this.BASE_URL}/pause`)
      .map(res => {
        res.json();
      })
  }
  play(): Observable<any> {
    console.log("Entra en el servicio");
    return this.http.get(`${this.BASE_URL}/play`)
      .map(res => {
        res.json();
      })
  }
  artistCurrent(): Observable<any> {
    console.log("Entra en el servicio");
    return this.http.get(`${this.BASE_URL}/artistCurrent`)
      .map(res => {
        this.artistCurrent = res.json();
        return this.artistCurrent;
      })
  }

}
