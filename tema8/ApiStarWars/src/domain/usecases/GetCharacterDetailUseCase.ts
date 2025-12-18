import { injectable, inject } from "inversify";
import { IGetCharacterDetailUseCase } from "../interfaces/IGetCharacterDetailUseCase";
import { IStarWarsRepository } from "../interfaces/IStarWarsRepository";
import { CharacterDetail } from "../entities/Character";
import { TYPES } from "../../core/types";

@injectable()
export class GetCharacterDetailUseCase implements IGetCharacterDetailUseCase {
    constructor(@inject(TYPES.IStarWarsRepository) private _repo: IStarWarsRepository) {}

    execute(id: string): Promise<CharacterDetail> {
        return this._repo.getCharacterDetail(id);
    }
}