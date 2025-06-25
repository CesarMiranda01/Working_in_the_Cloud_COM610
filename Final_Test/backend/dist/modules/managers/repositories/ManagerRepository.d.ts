import { IManager, IManagerCreate, IManagerUpdate, IManagerFilter } from '../interfaces';
declare class ManagerRepository {
    create(data: IManagerCreate): Promise<IManager>;
    findById(id: string): Promise<IManager | null>;
    findByDni(dni: string): Promise<IManager | null>;
    update(id: string, data: IManagerUpdate): Promise<IManager>;
    delete(id: string): Promise<void>;
    list(filter?: IManagerFilter): Promise<IManager[]>;
}
declare const _default: ManagerRepository;
export default _default;
