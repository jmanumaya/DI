import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { Persona } from "../../../domain/entities/Persona";
import { IAddPersonaUseCase } from "../../../domain/interfaces/useCases/personas/IAddPersonaUseCase";
import { IDeletePersonaUseCase } from "../../../domain/interfaces/useCases/personas/IDeletePersonaUseCase";
import { IGetPersonasUseCase } from "../../../domain/interfaces/useCases/personas/IGetPersonasUseCase";
import { IUpdatePersonaUseCase } from "../../../domain/interfaces/useCases/personas/IUpdatePersonaUseCase";
import { PersonaUIModel } from "../../models/PersonaUIModel";

// Colores para asignar a las personas
const COLORS = [
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4",
    "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F"
];

@injectable()
export class PersonasViewModel {
    private _personas: PersonaUIModel[] = [];
    private _selectedPersona: PersonaUIModel | null = null;
    private _isLoading: boolean = false;
    private _error: string | null = null;
    private _searchQuery: string = "";
    private _listeners: Set<() => void> = new Set();

    constructor(
        @inject(TYPES.IGetPersonasUseCase) private getPersonasUseCase: IGetPersonasUseCase,
        @inject(TYPES.IAddPersonaUseCase) private addPersonaUseCase: IAddPersonaUseCase,
        @inject(TYPES.IUpdatePersonaUseCase) private updatePersonaUseCase: IUpdatePersonaUseCase,
        @inject(TYPES.IDeletePersonaUseCase) private deletePersonaUseCase: IDeletePersonaUseCase
    ) { }

    // Getters
    get personas(): PersonaUIModel[] {
        if (!this._searchQuery) return this._personas;
        const query = this._searchQuery.toLowerCase();
        return this._personas.filter(
            p => p.name.toLowerCase().includes(query) ||
                p.surname.toLowerCase().includes(query)
        );
    }

    get selectedPersona(): PersonaUIModel | null {
        return this._selectedPersona;
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

    selectPersona(persona: PersonaUIModel | null): void {
        this._selectedPersona = persona;
        this.notifyListeners();
    }

    // Casos de uso
    async loadPersonas(): Promise<void> {
        this._isLoading = true;
        this._error = null;
        this.notifyListeners();

        try {
            const personasDTO = await this.getPersonasUseCase.execute();
            this._personas = personasDTO.map((dto, index) => ({
                ...dto,
                color: COLORS[index % COLORS.length],
                isSelected: false,
            }));
        } catch (err) {
            this._error = err instanceof Error ? err.message : "Error al cargar personas";
        } finally {
            this._isLoading = false;
            this.notifyListeners();
        }
    }

    async addPersona(persona: Omit<Persona, "id">): Promise<boolean> {
        this._isLoading = true;
        this._error = null;
        this.notifyListeners();

        try {
            await this.addPersonaUseCase.execute(persona);
            await this.loadPersonas();
            return true;
        } catch (err) {
            this._error = err instanceof Error ? err.message : "Error al añadir persona";
            this.notifyListeners();
            return false;
        }
    }

    async updatePersona(id: number, persona: Partial<Persona>): Promise<boolean> {
        this._isLoading = true;
        this._error = null;
        this.notifyListeners();

        try {
            await this.updatePersonaUseCase.execute(id, persona);
            await this.loadPersonas();
            return true;
        } catch (err) {
            this._error = err instanceof Error ? err.message : "Error al actualizar persona";
            this.notifyListeners();
            return false;
        }
    }

    async deletePersona(id: number): Promise<boolean> {
        this._isLoading = true;
        this._error = null;
        this.notifyListeners();

        try {
            await this.deletePersonaUseCase.execute(id);
            await this.loadPersonas();
            return true;
        } catch (err) {
            this._error = err instanceof Error ? err.message : "Error al eliminar persona";
            this.notifyListeners();
            return false;
        }
    }

    clearError(): void {
        this._error = null;
        this.notifyListeners();
    }
}
