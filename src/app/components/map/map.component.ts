import { Component, OnInit, Input } from '@angular/core';
import { latLng, Layer, marker, icon, tileLayer } from 'leaflet';
import { FarmaciasService } from './../../services/farmacias.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [FarmaciasService]
})
export class MapComponent implements OnInit {
  @Input() lstFarmacias: Array<Object> = [];
  markers: Layer[] = [];
  total: number;

  constructor(private farmaciasService: FarmaciasService) { }

  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Layers control object with our two base layers and the three overlay layers
  layersControl = {
    baseLayers: {
      'Street Maps': this.streetMaps,
      'Wikimedia Maps': this.wMaps
    }
  };

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 13,
    maxZoom: 20,
    center: latLng([41.65606, -0.87734])
  };

  onMapReady(map: L.Map) {
    setTimeout(() => {
      map.invalidateSize();
    }, 0);

    map.on('click', <LeafletMouseEvent>(e) => { console.log(e.latlng) });

  }

  cargarFarmacias(): void {
    this.markers = [];
    this.lstFarmacias.map((a: any = {}) => {
      if (a.geometry !== undefined) {
        var lng = a.geometry.coordinates[0];
        var lat = a.geometry.coordinates[1];
        const newMarker = marker(
          [lat, lng],
          {
            icon: icon({
              iconSize: [25, 41],
              iconAnchor: [13, 41],
              iconUrl: 'assets/pharmacy_icon.png',
              shadowUrl: 'leaflet/marker-shadow.png'
            })
          }
        );
        newMarker.bindPopup('<p>' + JSON.stringify(a) + '</p>', { autoPan: true });
        this.markers.push(newMarker);
      }
    });
    console.log(this.markers);
  }

  ngOnInit(): void {
  }

}
