import { useMemo } from "react";
import { container } from "../../core/container";
import { TYPES } from "../../core/types";
import { IGetDepartmentsUseCase } from "../../domain/interfaces/usecases/IGetDepartmentsUseCase";
import { IDeleteDepartmentUseCase } from "../../domain/interfaces/usecases/IDeleteDepartmentUseCase";
import { DepartmentListViewModel } from "../DepartmentListViewModel";

export const useDepartmentListViewModel = () => {
  const viewModel = useMemo(() => {
    const getDepartmentsUseCase = container.get<IGetDepartmentsUseCase>(
      TYPES.IGetDepartmentsUseCase
    );
    const deleteDepartmentUseCase = container.get<IDeleteDepartmentUseCase>(
      TYPES.IDeleteDepartmentUseCase
    );

    return new DepartmentListViewModel(getDepartmentsUseCase, deleteDepartmentUseCase);
  }, []);

  return viewModel;
};
