import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "../core/types";

// Interfaces
import { IPokemonRepository } from "../domain/interfaces/IPokemonRepository";
import { IPokemonUseCase } from "../domain/interfaces/IPokemonUseCase";

// Implementaciones
import { PokemonRepository } from "../data/repositories/PokemonRepository";
import { PokemonUseCase } from "../domain/usecase/PokemonUseCase";

const container = new Container();

// 1. Bind Repositorios
// "Cuando alguien pida un IPokemonRepository, dale una instancia de PokemonRepository"
container.bind<IPokemonRepository>(TYPES.IPokemonRepository).to(PokemonRepository);

// 2. Bind Casos de Uso
// "Cuando alguien pida un IPokemonUseCase, dale una instancia de PokemonUseCase"
container.bind<IPokemonUseCase>(TYPES.IPokemonUseCase).to(PokemonUseCase);

export { container };