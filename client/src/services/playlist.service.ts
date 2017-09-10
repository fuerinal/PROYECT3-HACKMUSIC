import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';
@Injectable()

export class PlaylistService {

  startLoginCompleted: boolean = false;
  BASE_URL: string = `${environment.BASE_URL}/api/spotify`;
  cont:any;

  constructor(private http: Http) {

  }

  artistCurrent(): Observable<any> {

    return this.http.get(`${this.BASE_URL}/artistCurrent`)
      .map(res => res.json())
  }

  playlistCurrent(): Observable<any> {

    return this.http.get(`${this.BASE_URL}/playlistCurrent`)
      .map(res => res.json())
  }
  playlistdata(): Observable<any> {

    return this.http.get(`${this.BASE_URL}/playlistdata`)
      .map(res => res.json())
  }
  refresh(): Observable<any> {

    return this.http.get(`${this.BASE_URL}/refresh`)
      .map(res => res.json())
  }
  reorder(i: any): Observable<any> {
    console.log("Entra en el servicio");
    console.log(i, "service");
    return this.http.post(`${this.BASE_URL}/reorder`, { i })
      .map(res => {
        this.cont=res.json();
        return this.cont
      })
  }
  setfirst(index: any): Observable<any> {
    // console.log("Entra en el servicio");
    // console.log(index, "serviceee");
    return this.http.post(`${this.BASE_URL}/setfirst`, { index })
      .map(res => {
        res.json();
      })
  }
}
