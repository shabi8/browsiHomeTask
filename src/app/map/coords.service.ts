import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoordsService {

  private coordsSource = new Subject<any>();
  coords$ = this.coordsSource.asObservable();

  private coordsSubmitSource = new Subject<any>();
  coordsSubmit$ = this.coordsSubmitSource.asObservable();

  constructor() { }

  sendCoords(coord:any) {
    this.coordsSource.next(coord);
  }

  sendCoordsSubmit(coord: any) {
    this.coordsSubmitSource.next(coord);
  }
}
