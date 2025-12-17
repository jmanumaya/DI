import { Pokemon } from '../../domain/entities/Pokemon';
import { PokemonItemDTO } from '../dto/PokemonDTO';

export class PokemonMapper {
    // Recibe un item crudo (DTO) y devuelve una Entidad de dominio (Pokemon)
    static mapToEntity(dto: PokemonItemDTO): Pokemon {
        // Extraemos un ID ficticio de la URL o usamos el nombre como ID temporal
        // La url es tipo: "https://pokeapi.co/api/v2/pokemon/1/"
        const id = dto.url.split('/').filter(Boolean).pop() || '0';

        return new Pokemon(
            id,
            dto.name,
            dto.url
        );
    }
}