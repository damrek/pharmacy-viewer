import { Component, OnInit } from '@angular/core';
import { latLng, Layer, marker, icon, tileLayer } from 'leaflet';
import { FarmaciasService } from './../../services/farmacias.service';
import { MapService } from 'src/app/services/map.service';
import { Result } from 'src/app/services/models';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [FarmaciasService]
})
export class MapComponent implements OnInit {
  lstFarmacias: Array<Result> = [];
  markers: Layer[] = [];
  total: number;

  constructor(private farmaciasService: FarmaciasService,
    private mapService: MapService) { }

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
    this.lstFarmacias = this.mapService.getSelected();
    this.lstFarmacias.map((f: Result) => {
      if (f.geometry !== undefined) {
        let lng = f.geometry.coordinates[0];
        let lat = f.geometry.coordinates[1];
        let iconurl = 'assets/pharmacy_icon.png';
        if (f.guardia !== undefined) {
          iconurl = 'assets/pharmacyg_icon.png';
        }
        const newMarker = marker(
          [lat, lng],
          {
            icon: icon({
              iconSize: [25, 41],
              iconAnchor: [13, 41],
              iconUrl: iconurl,
              shadowUrl: 'leaflet/marker-shadow.png'
            })
          }
        );
        newMarker.bindPopup('<p>' + JSON.stringify(f) + '</p>', { autoPan: true });
        this.markers.push(newMarker);
      }
    });
    // console.log(this.markers);
  }

  limpiarFarmacias() {
    this.lstFarmacias = [];
    this.mapService.setSelected(this.lstFarmacias);
    this.cargarFarmacias();
  }

  ngOnInit(): void {
    this.mapService.currentMessage.subscribe(currentData => this.cargarFarmacias());
  }

}
