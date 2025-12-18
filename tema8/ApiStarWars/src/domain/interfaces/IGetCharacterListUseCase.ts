import { Character } from "../entities/Character";

export interface IGetCharacterListUseCase {
    execute(): Promise<Character[]>;
}