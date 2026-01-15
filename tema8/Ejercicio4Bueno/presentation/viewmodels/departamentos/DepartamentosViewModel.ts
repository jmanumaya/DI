import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { Departamento } from "../../../domain/entities/Departamento";
import { IAddDepartamentoUseCase } from "../../../domain/interfaces/useCases/departamentos/IAddDepartamentoUseCase";
import { IDeleteDepartamentoUseCase } from "../../../domain/interfaces/useCases/departamentos/IDeleteDepartamentoUseCase";
import { IGetDepartamentosUseCase } from "../../../domain/interfaces/useCases/departamentos/IGetDepartamentosUseCase";
import { IUpdateDepartamentoUseCase } from "../../../domain/interfaces/useCases/departamentos/IUpdateDepartamentoUseCase";
import { DepartamentoUIModel } from "../../models/DepartamentoUIModel";

// Colores para asignar a los departamentos
const COLORS = [
    "#6366F1", "#8B5CF6", "#EC4899", "#F59E0B",
    "#10B981", "#3B82F6", "#EF4444", "#14B8A6"
];

@injectable()
export class DepartamentosViewModel {
    private _departamentos: DepartamentoUIModel[] = [];
    private _selectedDepartamento: DepartamentoUIModel | null = null;
    private _isLoading: boolean = false;
    private _error: string | null = null;
    private _searchQuery: string = "";
    private _listeners: Set<() => void> = new Set();

    constructor(
        @inject(TYPES.IGetDepartamentosUseCase) private getDepartamentosUseCase: IGetDepartamentosUseCase,
        @inject(TYPES.IAddDepartamentoUseCase) private addDepartamentoUseCase: IAddDepartamentoUseCase,
        @inject(TYPES.IUpdateDepartamentoUseCase) private updateDepartamentoUseCase: IUpdateDepartamentoUseCase,
        @inject(TYPES.IDeleteDepartamentoUseCase) private deleteDepartamentoUseCase: IDeleteDepartamentoUseCase
    ) { }

    // Getters
    get departamentos(): DepartamentoUIModel[] {
        if (!this._searchQuery) return this._departamentos;
        const query = this._searchQuery.toLowerCase();
        return this._departamentos.filter(
            d => d.name.toLowerCase().includes(query)
        );
    }

    get selectedDepartamento(): DepartamentoUIModel | null {
        return this._selectedDepartamento;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    get error(): string | null {
        return this._error;
    }

    get searchQuery(): string {
        return this._searchQuery;
    }

    // Métodos para suscripción a cambios (patrón Observer)
    subscribe(listener: () => void): () => void {
        this._listeners.add(listener);
        return () => this._listeners.delete(listener);
    }

    private notifyListeners(): void {
        this._listeners.forEach(listener => listener());
    }

    // Setters
    setSearchQuery(query: string): void {
        this._searchQuery = query;
        this.notifyListeners();
    }

    selectDepartamento(departamento: DepartamentoUIModel | null): void {
        this._selectedDepartamento = departamento;
        this.notifyListeners();
    }

    // Casos de uso
    async loadDepartamentos(): Promise<void> {
        this._isLoading = true;
        this._error = null;
        this.notifyListeners();

        try {
            const departamentosDTO = await this.getDepartamentosUseCase.execute();
            this._departamentos = departamentosDTO.map((dto, index) => ({
                ...dto,
                color: COLORS[index % COLORS.length],
                isSelected: false,
            }));
        } catch (err) {
            this._error = err instanceof Error ? err.message : "Error al cargar departamentos";
        } finally {
            this._isLoading = false;
            this.notifyListeners();
        }
    }

    async addDepartamento(departamento: Omit<Departamento, "id">): Promise<boolean> {
        this._isLoading = true;
        this._error = null;
        this.notifyListeners();

        try {
            await this.addDepartamentoUseCase.execute(departamento);
            await this.loadDepartamentos();
            return true;
        } catch (err) {
            this._error = err instanceof Error ? err.message : "Error al añadir departamento";
            this.notifyListeners();
            return false;
        }
    }

    async updateDepartamento(id: number, departamento: Partial<Departamento>): Promise<boolean> {
        this._isLoading = true;
        this._error = null;
        this.notifyListeners();

        try {
            await this.updateDepartamentoUseCase.execute(id, departamento);
            await this.loadDepartamentos();
            return true;
        } catch (err) {
            this._error = err instanceof Error ? err.message : "Error al actualizar departamento";
            this.notifyListeners();
            return false;
        }
    }

    async deleteDepartamento(id: number): Promise<boolean> {
        this._isLoading = true;
        this._error = null;
        this.notifyListeners();

        try {
            await this.deleteDepartamentoUseCase.execute(id);
            await this.loadDepartamentos();
            return true;
        } catch (err) {
            this._error = err instanceof Error ? err.message : "Error al eliminar departamento";
            this.notifyListeners();
            return false;
        }
    }

    clearError(): void {
        this._error = null;
        this.notifyListeners();
    }
}
