import { Person } from "../../entities/Person";

export interface ISavePersonUseCase {
  execute(person: Person): Promise<void>;
}