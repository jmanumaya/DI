import { injectable, inject } from "inversify";
import { IPokemonUseCase } from '../interfaces/IPokemonUseCase';
import { IPokemonRepository } from '../interfaces/IPokemonRepository';
import { Pokemon } from '../entities/Pokemon';
import { TYPES } from "../../core/types";

@injectable()
export class PokemonUseCase implements IPokemonUseCase {
  //#region Propiedades
  private _pokemonRepository: IPokemonRepository;
  //#endregion

  //#region Constructor
  constructor(@inject(TYPES.IPokemonRepository) pokemonRepository: IPokemonRepository) {
    this._pokemonRepository = pokemonRepository;
  }
  //#endregion

  //#region Métodos públicos
  execute(limit: number, offset: number): Promise<Pokemon[]> {
    return this._pokemonRepository.getAll(limit, offset);
  }
  //#endregion
}