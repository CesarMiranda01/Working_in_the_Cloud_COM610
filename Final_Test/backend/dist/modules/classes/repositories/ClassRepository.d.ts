import { IClass, IClassCreate, IClassUpdate, IClassFilter } from '../interfaces';
declare class ClassRepository {
    create(data: IClassCreate & {
        managerName: string;
        managerDni: string;
        userName: string;
        userDni: string;
    }): Promise<IClass>;
    findById(id: string): Promise<IClass | null>;
    findByManagerId(managerId: string): Promise<IClass[]>;
    findByUserId(userId: string): Promise<IClass[]>;
    update(id: string, data: IClassUpdate & Partial<{
        managerName: string;
        managerDni: string;
        userName: string;
        userDni: string;
    }>): Promise<IClass>;
    delete(id: string): Promise<void>;
    list(filter?: IClassFilter): Promise<IClass[]>;
}
declare const classRepositoryInstance: ClassRepository;
export default classRepositoryInstance;
