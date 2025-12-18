export interface PeopleResultDTO {
    name: string;
    // "https://swapi.dev/api/people/1/"
    url: string;
}

export interface PeopleResponseDTO {
    results: PeopleResultDTO[];
}

export interface PersonDetailDTO {
    name: string;
    gender: string;
    // url del planeta
    homeworld: string; 
}

export interface PlanetDTO {
    name: string;
}