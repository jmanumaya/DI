import { useMemo } from "react";
import { container } from "../../core/container";
import { TYPES } from "../../core/types";
import { ISaveDepartmentUseCase } from "../../domain/interfaces/usecases/ISaveDepartmentUseCase";
import { DepartmentEditViewModel } from "../DepartmentEditViewModel";

export const useDepartmentEditViewModel = () => {
  const viewModel = useMemo(() => {
    const saveDepartmentUseCase = container.get<ISaveDepartmentUseCase>(
      TYPES.ISaveDepartmentUseCase
    );

    return new DepartmentEditViewModel(saveDepartmentUseCase);
  }, []);

  return viewModel;
};