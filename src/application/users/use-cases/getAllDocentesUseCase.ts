import { DocenteRepositoryPort } from '../ports/docenteRepositoryPort';
import { Docente } from '../../../core/users/domain/docenteEntity';

export class GetAllDocentesUseCase {
    constructor(private readonly docenteRepository: DocenteRepositoryPort) { }

    async execute(): Promise<any[]> {
        return await this.docenteRepository.getAllDocentes();
    }
}
