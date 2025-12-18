import { useState, useEffect } from 'react';
import { container } from '../../core/container';
import { TYPES } from '../../core/types';
import { IGetCharacterDetailUseCase } from '../../domain/interfaces/IGetCharacterDetailUseCase';
import { CharacterDetail } from '../../domain/entities/Character';

export const useCharacterDetailViewModel = (id: string) => {
    const [character, setCharacter] = useState<CharacterDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Empieza cargando

    const useCase = container.get<IGetCharacterDetailUseCase>(TYPES.IGetCharacterDetailUseCase);

    useEffect(() => {
        const loadDetail = async () => {
            if (!id) return;
            setIsLoading(true);
            try {
                const data = await useCase.execute(id);
                setCharacter(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        loadDetail();
    }, [id]);

    return { character, isLoading };
};