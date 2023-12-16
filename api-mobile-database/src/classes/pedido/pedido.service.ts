import { Injectable, NotFoundException } from '@nestjs/common';
import { PedidoEntity } from './pedido.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class pedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
  ) {}

  async inverterStatusAtendimento(id: number): Promise<PedidoEntity | undefined> {
    try {
 
      const pedido = await this.pedidoRepository.findOne({ where: { id } });

      if (!pedido) {
        throw new NotFoundException(`Pedido com ID ${id} não encontrado`);
      }
      // inverter o valor de em_atendimento
      pedido.em_atendimento = !pedido.em_atendimento;
      await this.pedidoRepository.save(pedido);

      //retorna o pedido atualizado
      return pedido;
    } catch (error) {

      console.error('Erro ao inverter o status de atendimento:', error);
      throw error;
    }
  }
}
