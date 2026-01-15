export class DepartamentoUIModel {
  id?: string;
  nombre: string;
  color?: string;

  constructor(nombre: string, id?: string, color?: string) {
    this.id = id;
    this.nombre = nombre;
    this.color = color || this.generarColor();
  }

  private generarColor(): string {
    const colores = [
      "#3498db",
      "#e74c3c",
      "#2ecc71",
      "#f39c12",
      "#9b59b6",
      "#1abc9c",
    ];
    return colores[Math.floor(Math.random() * colores.length)];
  }
}
