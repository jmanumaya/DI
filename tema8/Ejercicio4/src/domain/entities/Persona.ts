export class Persona {
  id?: string;
  nombre: string;
  edad: number;
  foto?: string;
  departamentoId: string;

  constructor(
    nombre: string,
    edad: number,
    departamentoId: string,
    foto?: string,
    id?: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.edad = edad;
    this.foto = foto;
    this.departamentoId = departamentoId;
  }
}
