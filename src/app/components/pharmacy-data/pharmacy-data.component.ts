import { BuscadorFormComponent } from './../buscador-form/buscador-form.component';
import { Component, OnInit } from '@angular/core';
import { FarmaciasService } from './../../services/farmacias.service';
import { Result } from '../../services/models';

interface Datos {
  title: string;
  tipo: string;
  registros: string;
  fecha: string;
}

@Component({
  selector: 'pharmacy-data',
  templateUrl: './pharmacy-data.component.html',
  styleUrls: ['./pharmacy-data.component.css'],
  providers: [FarmaciasService]
})
export class PharmacyDataComponent implements OnInit {
  loading = true;
  infoFarmacia = false;
  infoFarmaciaSelected: Result;
  lstFarmacias: Array<Result> = [];
  selected: Array<Result> = [];

  nombre: string = '';
  tipo: string = 'todos';
  totalrows: string = '25';
  fecha: string;

  constructor(private farmaciasService: FarmaciasService) { }

  ngOnInit(): void {
    this.load();
  }

  private onSubmit(data: Datos) {
    if (this.tipo !== data.tipo || this.totalrows !== data.registros
      || this.fecha !== data.fecha
      || this.nombre !== data.title) {
      this.totalrows = data.registros;
      if (data.tipo === '') {
        data.tipo = 'todos';
      }
      this.tipo = data.tipo;

      let hoy: string;
      if (data.fecha) {
        hoy = data.fecha.substr(3, 2) + '-' + data.fecha.substr(0, 2) + '-' + '2019';
      }
      this.fecha = hoy;
      this.nombre = data.title;
      this.loading = true;
      this.load();
    }
  }


  private load(): void {
    this.farmaciasService.getFarmacias(this.tipo, this.totalrows, this.fecha, this.nombre).subscribe(data => {
      this.lstFarmacias = [];
      this.selected = [];
      this.lstFarmacias = data;
      this.loading = false;
    }, error => {
      console.error(`There was an error loading farmacias: ${error}`);
    });
  }

  verInfoFarmacia(id: string) {
    this.infoFarmacia = true;
    this.farmaciasService.getFarmacia(id).subscribe((data: Result) => {
      this.infoFarmaciaSelected = data;
    }, error => {
      console.error(`There was an error loading farmacia id (${id}) | ${error}`);
    });
  }

  /**
   * Muestra elementos seleccionados en el mapa
   */
  mostrar() {
    this.selected.forEach(element => {
      console.log(element.title);
    });
  }

}
