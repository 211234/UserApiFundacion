import { Request, Response, NextFunction } from 'express';
import { RegisterDocenteUseCase } from '../../../../application/users/use-cases/registerDocenteUseCase';
import { RegisterDocenteDTO } from '../dtos/registerDocenteDto';
import { AuditService } from '../../../../core/users/services/auditService';
import { UserRepositoryPort } from '../../../../application/users/ports/userRepositoryPort';

export class RegisterDocenteController {
    constructor(
        private registerDocenteUseCase: RegisterDocenteUseCase,
        private auditService: AuditService,
        private userRepository: UserRepositoryPort // Necesario para buscar el usuario administrador
    ) { }

    async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const docenteDTO: RegisterDocenteDTO = req.body;

            // Verificar si el usuario logueado es administrador usando el correo
            const adminUser = await this.userRepository.findByEmail(docenteDTO.id_usuario);
            if (!adminUser || adminUser.tipo !== 'Administrador') {
                throw new Error('Solo el Administrador puede registrar un docente');
            }

            // Reemplazar `id_usuario` con el `id_usuario` del administrador real
            docenteDTO.id_usuario = adminUser.id_usuario;

            // Ejecutar el caso de uso para registrar un docente
            const docente = await this.registerDocenteUseCase.execute(docenteDTO);

            console.log('Datos recibidos:', docenteDTO);
            console.log('Usuario administrador encontrado:', adminUser);
            console.log('Docente creado:', docente);

            // Registrar acción en la auditoría
            await this.auditService.createAuditLog({
                id_usuario: adminUser.id_usuario,
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
