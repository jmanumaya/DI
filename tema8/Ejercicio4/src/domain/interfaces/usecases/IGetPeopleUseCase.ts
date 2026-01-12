import { Person } from "../../entities/Person";

export interface IGetPeopleUseCase {
  execute(): Promise<Person[]>;
}