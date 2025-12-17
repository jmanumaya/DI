// Definimos cómo es UN item dentro del array 'results'
export interface PokemonItemDTO {
    name: string;
    url: string;
}

// Definimos la respuesta completa de la API
export interface PokemonResponseDTO {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonItemDTO[]; 
}