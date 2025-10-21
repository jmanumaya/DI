import { injectable } from "inversify";
import { Persona } from "../entities/Persona";

export interface IRepositoryPersonas {
  getListadoCompletoPersonas(): Persona[];
}

@injectable()
export class PersonasRepository implements IRepositoryPersonas {
  getListadoCompletoPersonas(): Persona[] {
    // En un futuro, esto podría hacer llamadas a una API que nos ofreciera los datos
    return [
      new Persona(1, "Fernando", "Galiana Fernández"),
      new Persona(2, "Carlos", "Martínez López"),
      new Persona(3, "Ana", "Rodríguez Pérez"),
      new Persona(4, "Miguel", "Sánchez Ruiz"),
      new Persona(5, "Laura", "Torres Díaz"),
      new Persona(6, "David", "Moreno García"),
    ];
  }
}

@injectable()
export class PersonasRepositoryEmpty implements IRepositoryPersonas {
  getListadoCompletoPersonas(): Persona[] {
    return [];
  }
}

@injectable()
export class PersonasRepository100 implements IRepositoryPersonas {
  getListadoCompletoPersonas(): Persona[] {
    const personas: Persona[] = [];

    for (let i = 1; i <= 100; i++) {
      personas.push(
        new Persona(i, `Persona${i}`, `Apellido${i}`)
      );
    }

    return personas;
  }
}
