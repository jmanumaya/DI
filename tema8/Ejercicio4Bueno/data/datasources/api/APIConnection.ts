// API Connection - Configuración base para conexión con Azure
const BASE_URL = "https://josemanuel-cxevfcgaewgadebz.spaincentral-01.azurewebsites.net/api";

export class APIConnection {
    static readonly PERSONAS_URL = `${BASE_URL}/Personas`;
    static readonly DEPARTAMENTOS_URL = `${BASE_URL}/DepartmentAPI`;

    static async get<T>(url: string): Promise<T> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    static async post<T>(url: string, data: object): Promise<T> {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    static async put<T>(url: string, data: object): Promise<T> {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    static async delete(url: string): Promise<boolean> {
        const response = await fetch(url, {
            method: "DELETE",
        });
        return response.ok;
    }
}
