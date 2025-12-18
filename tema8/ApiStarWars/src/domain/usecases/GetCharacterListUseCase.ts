import { injectable, inject } from "inversify";
import { IGetCharacterListUseCase } from "../interfaces/IGetCharacterListUseCase";
import { IStarWarsRepository } from "../interfaces/IStarWarsRepository";
import { Character } from "../entities/Character";
import { TYPES } from "../../core/types";

@injectable()
export class GetCharacterListUseCase implements IGetCharacterListUseCase {
    constructor(@inject(TYPES.IStarWarsRepository) private _repo: IStarWarsRepository) {}

    execute(): Promise<Character[]> {
        return this._repo.getPeople();
    }
}