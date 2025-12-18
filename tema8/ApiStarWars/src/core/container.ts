import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "../core/types";

// Interfaces
import { IStarWarsRepository } from "../domain/interfaces/IStarWarsRepository";
import { IGetCharacterDetailUseCase } from "../domain/interfaces/IGetCharacterDetailUseCase";
import { IGetCharacterListUseCase } from "../domain/interfaces/IGetCharacterListUseCase";

// Implementaciones
import { StarWarsRepository } from "../data/repositories/StarWarsRepository";
import { GetCharacterListUseCase } from "../domain/usecases/GetCharacterListUseCase";
import { GetCharacterDetailUseCase } from "../domain/usecases/GetCharacterDetailUseCase";

const container = new Container();

container.bind<IStarWarsRepository>(TYPES.IStarWarsRepository).to(StarWarsRepository);
container.bind<IGetCharacterListUseCase>(TYPES.IGetCharacterListUseCase).to(GetCharacterListUseCase);
container.bind<IGetCharacterDetailUseCase>(TYPES.IGetCharacterDetailUseCase).to(GetCharacterDetailUseCase);

export { container };