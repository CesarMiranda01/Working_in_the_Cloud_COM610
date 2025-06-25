export interface IClass {
    id?: string;
    subject: string;
    managerId: string;
    managerName: string;
    managerDni: string;
    userId: string;
    userName: string;
    userDni: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface IClassCreate {
    subject: string;
    managerId: string;
    userId: string;
}
export interface IClassUpdate {
    subject?: string;
    managerId?: string;
    userId?: string;
}
export interface IClassFilter {
    subject?: string;
    managerId?: string;
    userId?: string;
}
