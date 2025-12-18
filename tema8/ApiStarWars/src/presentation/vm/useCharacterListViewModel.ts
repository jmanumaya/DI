import { useState, useEffect } from 'react';
import { container } from '../../core/container';
import { TYPES } from '../../core/types';
import { IGetCharacterListUseCase } from '../../domain/interfaces/IGetCharacterListUseCase';
import { Character } from '../../domain/entities/Character';

export const useCharacterListViewModel = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const useCase = container.get<IGetCharacterListUseCase>(TYPES.IGetCharacterListUseCase);

    const loadCharacters = async () => {
        setIsLoading(true);
        try {
            const data = await useCase.execute();
            setCharacters(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // carga inicial
    useEffect(() => {
        loadCharacters();
    }, []);

    const selectCharacter = (id: string) => {
        // si se pulsa el que ya está seleccionado, lo deselecciona
        if (selectedId === id) setSelectedId(null);
        else setSelectedId(id);
    };

    return {
        characters,
        selectedId,
        isLoading,
        selectCharacter
    };
};