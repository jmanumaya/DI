import { useState } from 'react';
import { container } from '../core/container';
import { TYPES } from '../core/types';
import { IPokemonUseCase } from '../domain/interfaces/IPokemonUseCase';
import { Pokemon } from '../domain/entities/Pokemon';

export const usePokemonViewModel = () => {
    const pokemonUseCase = container.get<IPokemonUseCase>(TYPES.IPokemonUseCase);

    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const loadMorePokemons = async () => {
        if (isLoading) return;

        setIsLoading(true);

        try {
            const newPokemons = await pokemonUseCase.execute(20, offset);

            setPokemonList((prevList) => [...prevList, ...newPokemons]);
            setOffset((prevOffset) => prevOffset + 20);
            
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        pokemonList,
        loadMorePokemons,
        isLoading
    };
};