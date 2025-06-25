import { IManager, IManagerCreate, IManagerUpdate, IManagerFilter } from '../interfaces';
declare class ManagerService {
    createManager(data: IManagerCreate): Promise<IManager>;
    getManager(id: string): Promise<IManager>;
    getManagerByDni(dni: string): Promise<IManager | null>;
    updateManager(id: string, data: IManagerUpdate): Promise<IManager>;
    deleteManager(id: string): Promise<void>;
    listManagers(filter?: IManagerFilter): Promise<IManager[]>;
}
declare const _default: ManagerService;
export default _default;
