import { injectable } from "inversify";
import { IPokemonRepository } from '../../domain/interfaces/IPokemonRepository';
import { Pokemon } from '../../domain/entities/Pokemon';
import { PokemonResponseDTO } from '../dto/PokemonDTO'; 
import { PokemonMapper } from '../mappers/PokemonMapper';

@injectable()
export class PokemonRepository implements IPokemonRepository {

  async getAll(limit: number, offset: number): Promise<Pokemon[]> {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      const data: PokemonResponseDTO = await response.json();
      
      return data.results.map((dtoItem) => PokemonMapper.mapToEntity(dtoItem));
    } catch (error) {
      console.error("Error fetching pokemons:", error);
      throw error;
    }
  }
}