export interface IUser {
  id: string;  // Cambiado a obligatorio
  name: string;
  dni: string;
  managerId: string;
  managerName: string;
  managerDni: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserCreate {
  name: string;
  dni: string;
  managerId: string;
}

export interface IUserUpdate {
  name?: string;
  managerId?: string;
}

export interface IUserFilter {
  dni?: string;
  managerId?: string;
  name?: string;
}