import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../../../core/users/services/servicesUser';
import { GetHijosByPadreUseCase } from '../../../../application/users/use-cases/getHijosByPadreUseCase';

export class GetHijosByPadreController {
    constructor(
        private readonly userService: UserService,
        private readonly getHijosByPadre: GetHijosByPadreUseCase
    ) { }

    async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id_usuario } = req.params;
            const hijos = await this.userService.getHijosByPadre(id_usuario);
            res.status(200).json({ hijos });
        } catch (error) {
            next(error);
        }
    }
}
