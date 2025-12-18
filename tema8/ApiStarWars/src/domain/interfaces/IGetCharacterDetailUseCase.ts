import { CharacterDetail } from "../entities/Character";

export interface IGetCharacterDetailUseCase {
    execute(id: string): Promise<CharacterDetail>;
}