import { Pokemon } from '../entities/Pokemon';

export interface IPokemonUseCase {
  // recibe los parámetros de paginación y devuelve la promesa con las entidades.
  execute(limit: number, offset: number): Promise<Pokemon[]>;
}