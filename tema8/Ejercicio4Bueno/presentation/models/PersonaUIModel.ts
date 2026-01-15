// Modelo UI de Persona con propiedades visuales
export interface PersonaUIModel {
    id: number;
    name: string;
    surname: string;
    telefono: string;
    direccion: string;
    foto: string;
    birth: string;
    departmentId: number;
    departmentName: string;
    // Propiedades visuales
    color?: string;
    isSelected?: boolean;
}
