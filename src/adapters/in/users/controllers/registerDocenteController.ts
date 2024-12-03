import { Request, Response, NextFunction } from 'express';
import { RegisterDocenteUseCase } from '../../../../application/users/use-cases/registerDocenteUseCase';
import { RegisterDocenteDTO } from '../dtos/registerDocenteDto';
import { AuditService } from '../../../../core/users/services/auditService';

export class RegisterDocenteController {
    constructor(
        private registerDocenteUseCase: RegisterDocenteUseCase,
        private auditService: AuditService
    ) { }

    async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const docenteDTO: RegisterDocenteDTO = req.body;

            // Ejecutar el caso de uso para registrar un docente
            const docente = await this.registerDocenteUseCase.execute(docenteDTO);

            // Registrar acción en la auditoría
            await this.auditService.createAuditLog({
                id_usuario: docenteDTO.id_usuario,
                accion: 'CREAR',
                entidad_afectada: 'docentes',
                id_entidad: docente.id_docente,
            });

            res.status(201).json(docente);
        } catch (error) {
            next(error);
        }
    }
}
