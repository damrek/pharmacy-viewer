import { Component, EventEmitter, Output, } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Datos {
  title: string;
  tipo: string;
  registros: string;
  fecha: string;
}

@Component({
  selector: 'app-buscador-form',
  templateUrl: './buscador-form.component.html',
  styleUrls: ['./buscador-form.component.css']
})
export class BuscadorFormComponent {
  form: FormGroup;
  @Output()
  datos = new EventEmitter<Datos>();

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      title: [''],
      tipo: [''],
      registros: [''],
      fecha: ['']
    });

  }

  submit() {
    if (this.form.valid) {
      // console.log(this.form.value);
      const values = <Datos>{};
      values.title = this.form.value.title;
      values.tipo = this.form.value.tipo;
      if (this.form.value.registros === '') {
        this.form.value.registros = '25';
      }
      values.registros = this.form.value.registros;
      values.fecha = this.form.value.fecha;
      this.datos.emit(values);
    }
  }

  getTipo(): string {
    return this.form.value.tipo;
  }

}
