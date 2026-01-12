import { useMemo } from "react";
import { container } from "../../core/container";
import { TYPES } from "../../core/types";
import { ISavePersonUseCase } from "../../domain/interfaces/usecases/ISavePersonUseCase";
import { IGetDepartmentsUseCase } from "../../domain/interfaces/usecases/IGetDepartmentsUseCase";
import { PersonEditViewModel } from "../PersonEditViewModel";

export const usePersonEditViewModel = () => {
  const viewModel = useMemo(() => {
    const savePersonUseCase = container.get<ISavePersonUseCase>(
      TYPES.ISavePersonUseCase
    );
    const getDepartmentsUseCase = container.get<IGetDepartmentsUseCase>(
      TYPES.IGetDepartmentsUseCase
    );

    return new PersonEditViewModel(savePersonUseCase, getDepartmentsUseCase);
  }, []);

  return viewModel;
};
