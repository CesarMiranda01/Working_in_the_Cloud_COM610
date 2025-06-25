import { IUser, IUserCreate, IUserUpdate, IUserFilter } from '../interfaces';
declare class UserRepository {
    create(data: IUserCreate & {
        managerName: string;
        managerDni: string;
    }): Promise<IUser>;
    findById(id: string): Promise<IUser | null>;
    findByDni(dni: string): Promise<IUser | null>;
    findByManagerId(managerId: string): Promise<IUser[]>;
    update(id: string, data: IUserUpdate & Partial<{
        managerName: string;
        managerDni: string;
    }>): Promise<IUser>;
    delete(id: string): Promise<void>;
    list(filter?: IUserFilter): Promise<IUser[]>;
}
declare const _default: UserRepository;
export default _default;
