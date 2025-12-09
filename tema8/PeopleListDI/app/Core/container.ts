import { Container } from "inversify";
import "reflect-metadata";
import { PersonasRepository } from "../Data/PersonasRepository";
import { IPersonasRepository  } from "../Domain/Interfaces/IPersonasRepository";
import { PeopleListVM } from "../UI/VM/PeopleListVM";
import { TYPES } from "./types";


const container = new Container();

container.bind<IPersonasRepository>(TYPES.IRepositoryPersonas).to(PersonasRepository);
container.bind<PeopleListVM>(TYPES.IndexVM).to(PeopleListVM);
export { container };