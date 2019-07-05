import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

/**COMPONENTES */
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';

/**MODULOS */
import { ClarityModule } from '@clr/angular';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { PharmacyDataComponent } from './components/pharmacy-data/pharmacy-data.component';
import { BuscadorFormComponent } from './components/buscador-form/buscador-form.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    PharmacyDataComponent,
    BuscadorFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    ClarityModule,
    BrowserAnimationsModule,
    LeafletModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
