import { UserRepositoryPort } from '../ports/userRepositoryPort';
import { Hijo } from '../../../core/users/domain/hijoEntity';

export class GetHijosByPadreUseCase {
    constructor(private readonly userRepository: UserRepositoryPort) { }

    async execute(idPadre: string): Promise<Hijo[]> {
        // Llamada al repositorio para obtener los hijos relacionados al padre.
        const hijos = await this.userRepository.getHijosByPadre(idPadre);
        if (!hijos) {
            throw new Error('No se encontraron hijos registrados para este padre.');
        }
        return hijos;
    }
}
