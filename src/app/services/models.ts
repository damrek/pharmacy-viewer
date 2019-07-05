export interface Objeto {
    totalCount: number;
    start: number;
    rows: number;
    result: Result[];
}

export interface Result {
    id: number;
    title: string;
    telefonos: string;
    horario?: string;
    clasificacion?: string;
    calle: string;
    geometry: Geometry;
    type?: string[];
    email?: string;
    descripcion?: string;
    servicios?: string;
    guardia?: Guardia;
}

export interface Guardia {
    fecha: string;
    turno: string;
    horario: string;
    sector: string;
}

export interface Geometry {
    type: string;
    coordinates: number[];
}
