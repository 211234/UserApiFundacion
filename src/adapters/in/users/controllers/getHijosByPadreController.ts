import { Request, Response } from 'express';
import { GetHijosByPadreUseCase } from '../../../../application/users/use-cases/getHijosByPadreUseCase';

export class GetHijosByPadreController {
  constructor(private getHijosByPadreUseCase: GetHijosByPadreUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id_usuario } = req.params;
    try {
      const hijos = await this.getHijosByPadreUseCase.execute(id_usuario);
      return res.status(200).json({ hijos });
    } catch (error) {
      return res.status(404).json({ error: 'No se encontraron hijos' });
    }
  }
}
