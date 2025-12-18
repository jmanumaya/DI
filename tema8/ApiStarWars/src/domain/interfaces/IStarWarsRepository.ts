import { Character, CharacterDetail } from "../entities/Character";

export interface IStarWarsRepository {
    getPeople(): Promise<Character[]>;
    getCharacterDetail(id: string): Promise<CharacterDetail>;
}