export class Departamento {
  id?: string;
  nombre: string;

  constructor(nombre: string, id?: string) {
    this.id = id;
    this.nombre = nombre;
  }
}
