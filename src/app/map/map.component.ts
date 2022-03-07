import { Component, OnInit } from '@angular/core';
import { LngLatLike, LngLat, Map } from 'mapbox-gl';
import { CoordsService } from './coords.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: any;
  mapStyle: string = "mapbox://styles/mapbox/streets-v9";
  origin: LngLatLike = [34.8516, 31.0461];
  zoom: any = [5];
  pitch: any= [45];

  showMarker = false;
  markerLngLat: any;
  markerDraggable: boolean = true;

  constructor(private coordsService: CoordsService) { }

  ngOnInit(): void {
    this.coordsService.coordsSubmit$.subscribe(coords => {
      const markLngLat = new LngLat(coords.longitude, coords.latitude);
      this.markerLngLat = markLngLat;
      this.showMarker = true;

      this.map.flyTo({
        center: markLngLat
      });
    })
  }

  addMarker(event: any) {
    // console.log(event);
    const lng = event.lngLat.lng;
    const lat = event.lngLat.lat;
    const markLngLat = new LngLat(lng, lat);
    this.markerLngLat = markLngLat;
    this.showMarker = true;
    this.coordsService.sendCoords(this.markerLngLat);

  }

  showDrag(marker: any) {
    const lng = marker._lngLat.lng;
    const lat = marker._lngLat.lat;
    const markLngLat = new LngLat(lng, lat);
    this.markerLngLat = markLngLat;
    this.coordsService.sendCoords(this.markerLngLat);
  }

}
