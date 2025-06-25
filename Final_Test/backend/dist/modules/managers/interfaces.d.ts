export interface IManager {
    id: string;
    name: string;
    dni: string;
    age: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface IManagerCreate {
    name: string;
    dni: string;
    age: number;
}
export interface IManagerUpdate {
    name?: string;
    dni?: string;
    age?: number;
}
export interface IManagerFilter {
    dni?: string;
    name?: string;
    minAge?: number;
    maxAge?: number;
}
