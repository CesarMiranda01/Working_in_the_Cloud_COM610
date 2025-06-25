import { Request, Response } from 'express';
declare class ClassController {
    create(req: Request, res: Response): Promise<void>;
    getById(req: Request<{
        id: string;
    }>, res: Response): Promise<void>;
    update(req: Request<{
        id: string;
    }>, res: Response): Promise<void>;
    delete(req: Request<{
        id: string;
    }>, res: Response): Promise<void>;
    list(req: Request, res: Response): Promise<void>;
    getByManager(req: Request<{
        managerId: string;
    }>, res: Response): Promise<void>;
    getByUser(req: Request<{
        userId: string;
    }>, res: Response): Promise<void>;
}
declare const classControllerInstance: ClassController;
export default classControllerInstance;
