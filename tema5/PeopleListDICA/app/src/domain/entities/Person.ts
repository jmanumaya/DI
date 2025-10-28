export class Person {
  //#region Propiedades privadas
  private _idPersona: number;
  private _name: string;
  private _surname: string;
  private _dateOfBirth: Date;
  //#endregion

  //#region Constructor
  constructor(idPersona: number, name: string, surname: string, dateOfBirth: Date) {
    this._idPersona = idPersona;
    this._name = name;
    this._surname = surname;
    this._dateOfBirth = dateOfBirth;
  }
  //#endregion

  //#region Getters
  get idPersona(): number {
    return this._idPersona;
  }

  get name(): string {
    return this._name;
  }

  get surname(): string {
    return this._surname;
  }

  get dateOfBirth(): Date {
    return this._dateOfBirth;
  }
  //#endregion

  //#region Setters
  set name(value: string) {
    if (!value.trim()) throw new Error("El nombre no puede estar vacío");
    this._name = value;
  }

  set surname(value: string) {
    if (!value.trim()) throw new Error("El apellido no puede estar vacío");
    this._surname = value;
  }

  set dateOfBirth(value: Date) {
    if (!(value instanceof Date) || isNaN(value.getTime())) {
      throw new Error("La fecha de nacimiento no es válida");
    }
    this._dateOfBirth = value;
  }
  //#endregion

  //#region Métodos públicos
  get fullName(): string {
    return `${this._name} ${this._surname}`;
  }
  //#endregion
}
