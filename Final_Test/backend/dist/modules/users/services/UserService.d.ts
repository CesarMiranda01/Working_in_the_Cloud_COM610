import { IUser, IUserCreate, IUserUpdate, IUserFilter } from '../interfaces';
declare class UserService {
    createUser(data: IUserCreate): Promise<IUser>;
    getUser(id: string): Promise<IUser>;
    updateUser(id: string, data: IUserUpdate): Promise<IUser>;
    deleteUser(id: string): Promise<void>;
    listUsers(filter?: IUserFilter): Promise<IUser[]>;
    getUsersByManager(managerId: string): Promise<IUser[]>;
}
declare const _default: UserService;
export default _default;
