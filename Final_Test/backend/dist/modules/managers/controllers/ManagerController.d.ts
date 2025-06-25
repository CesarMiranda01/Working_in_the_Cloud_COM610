import { Request, Response } from 'express';
declare class ManagerController {
    create(req: Request, res: Response): Promise<void>;
    getById(req: Request<{
        id: string;
    }>, res: Response): Promise<void>;
    getByDni(req: Request<{
        dni: string;
    }>, res: Response): Promise<void>;
    update(req: Request<{
        id: string;
    }>, res: Response): Promise<void>;
    delete(req: Request<{
        id: string;
    }>, res: Response): Promise<void>;
    list(req: Request, res: Response): Promise<void>;
}
declare const _default: ManagerController;
export default _default;
