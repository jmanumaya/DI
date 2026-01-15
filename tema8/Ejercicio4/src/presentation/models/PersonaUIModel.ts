export class PersonaUIModel {
  id?: string;
  nombre: string;
  edad: number;
  foto?: string;
  departamentoId: string;
  nombreDepartamento?: string;
  color?: string;

  constructor(
    nombre: string,
    edad: number,
    departamentoId: string,
    foto?: string,
    id?: string,
    nombreDepartamento?: string,
    color?: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.edad = edad;
    this.foto = foto;
    this.departamentoId = departamentoId;
    this.nombreDepartamento = nombreDepartamento;
    this.color = color || this.generarColor();
  }

  private generarColor(): string {
    const colores = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#FFA07A",
      "#98D8C8",
      "#F7DC6F",
    ];
    return colores[Math.floor(Math.random() * colores.length)];
  }
}
