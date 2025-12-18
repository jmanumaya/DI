import { Character, CharacterDetail } from "../../domain/entities/Character";
import { PeopleResultDTO, PersonDetailDTO, PlanetDTO } from "../dto/StarWarsDTO";

export class StarWarsMapper {
    static toCharacterEntity(dto: PeopleResultDTO): Character {
        // se extrae de la URL: "https://swapi.dev/api/people/1/" -> "1"
        const parts = dto.url.split('/').filter(Boolean);
        const id = parts.pop() || '0';
        return new Character(id, dto.name);
    }

    static toDetailEntity(personDto: PersonDetailDTO, planetDto: PlanetDTO): CharacterDetail {
        return new CharacterDetail(
            personDto.name,
            personDto.gender,
            planetDto.name
        );
    }
}