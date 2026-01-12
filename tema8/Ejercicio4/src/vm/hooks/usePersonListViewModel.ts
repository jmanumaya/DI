import { useMemo } from "react";
import { container } from "../../core/container";
import { TYPES } from "../../core/types";
import { IGetPeopleUseCase } from "../../domain/interfaces/usecases/IGetPeopleUseCase";
import { IDeletePersonUseCase } from "../../domain/interfaces/usecases/IDeletePersonUseCase";
import { PersonListViewModel } from "../PersonListViewModel";

export const usePersonListViewModel = () => {
  const viewModel = useMemo(() => {
    const getPeopleUseCase = container.get<IGetPeopleUseCase>(
      TYPES.IGetPeopleUseCase
    );
    const deletePersonUseCase = container.get<IDeletePersonUseCase>(
      TYPES.IDeletePersonUseCase
    );

    return new PersonListViewModel(getPeopleUseCase, deletePersonUseCase);
  }, []);

  return viewModel;
};