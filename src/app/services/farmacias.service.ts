import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { map } from 'rxjs/operators';
import { Objeto, Result } from './models';


@Injectable({
  providedIn: 'root'
})
export class FarmaciasService {

  constructor(private _http: HttpClient) { }

  /**
   * Devuelve api de lista de farmacias
   * @param query
   */
  getQueryFarmacias(query: string) {
    const url = ConfigService.get('apifarmacias') + `?${query}`;

    return this._http.get(url);
  }

  /**
   * Devuelve api de detalle de farmacia
   * @param query
   */
  getQueryFarmacia(query: string) {
    const url = ConfigService.get('apifarmacia') + `${query}`;

    return this._http.get(url);
  }

  getFarmacias(tipo: string = 'todos', rows: string = '25', fecha: string = '', nombre: string = '', calle: string = '') {

    return this.getQueryFarmacias(`tipo=${tipo}&rows=${rows}&title=*${nombre}*&fecha=${fecha}&calle=*${calle}*`).pipe(map((data: Objeto) => data.result));

  }

  getFarmacia(id: string) {

    return this.getQueryFarmacia(`${id}.json`).pipe(map((data: Result) => data));

  }


}
