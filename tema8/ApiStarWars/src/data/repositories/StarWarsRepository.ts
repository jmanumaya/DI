import { injectable } from "inversify";
import { IStarWarsRepository } from "../../domain/interfaces/IStarWarsRepository";
import { Character, CharacterDetail } from "../../domain/entities/Character";
import { PeopleResponseDTO, PersonDetailDTO, PlanetDTO } from "../dto/StarWarsDTO";
import { StarWarsMapper } from "../mappers/StarWarsMapper";

@injectable()
export class StarWarsRepository implements IStarWarsRepository {
    
    async getPeople(): Promise<Character[]> {
        const response = await fetch("https://swapi.dev/api/people");
        const data: PeopleResponseDTO = await response.json();
        return data.results.map(StarWarsMapper.toCharacterEntity);
    }

    async getCharacterDetail(id: string): Promise<CharacterDetail> {
        // se piden los datos del personaje
        const personResponse = await fetch(`https://swapi.dev/api/people/${id}`);
        const personData: PersonDetailDTO = await personResponse.json();

        // se piden los datos del planeta (usando la URL que vino en el personaje)
        const planetResponse = await fetch(personData.homeworld);
        const planetData: PlanetDTO = await planetResponse.json();

        // se mapea todo junto
        return StarWarsMapper.toDetailEntity(personData, planetData);
    }
}