import { IClass, IClassCreate, IClassUpdate, IClassFilter } from '../interfaces';
declare class ClassService {
    createClass(data: IClassCreate): Promise<IClass>;
    getClass(id: string): Promise<IClass | null>;
    updateClass(id: string, data: IClassUpdate): Promise<IClass>;
    deleteClass(id: string): Promise<void>;
    listClasses(filter?: IClassFilter): Promise<IClass[]>;
    getClassesByManager(managerId: string): Promise<IClass[]>;
    getClassesByUser(userId: string): Promise<IClass[]>;
}
declare const _default: ClassService;
export default _default;
