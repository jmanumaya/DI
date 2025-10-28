import { Container } from "inversify";
import "reflect-metadata";
import { TYPES } from "./types";

import { IPersonRepository } from "../domain/repositories/IPersonRepository";
import { PersonRepository100 } from "../data/repositories/PersonRepository100";

import { IGetPersonListUseCase } from "../domain/usecases/IGetPersonListUseCase";
import { GetPersonListUseCase } from "../domain/usecases/GetPersonListUseCase";

import { PersonListViewModel } from "../presentation/viewmodels/PersonListViewModel";

const container = new Container();

// Bind repositorios
container.bind<IPersonRepository>(TYPES.IPersonRepository).to(PersonRepository100);

// Bind use case
container.bind<IGetPersonListUseCase>(TYPES.IGetPersonListUseCase).to(GetPersonListUseCase);

// Bind ViewModel
container.bind<PersonListViewModel>(TYPES.PersonListViewModel).to(PersonListViewModel);

export { container };
