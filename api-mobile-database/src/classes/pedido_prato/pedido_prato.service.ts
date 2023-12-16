import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PedidoPratoEntity } from './pedido_prato.entity';
import { PratoEntity } from '../prato/prato.entity';
import { PedidoEntity } from '../pedido/pedido.entity';

@Injectable()
export class PedidoPratoService {
  constructor(
    @InjectRepository(PedidoPratoEntity)
    private readonly pedidoPratoRepository: Repository<PedidoPratoEntity>,
  ) {}

  //Buscar todos os resultados da tabela prato_pedido ====================================================
  async realizarConsulta(): Promise<any[]> {
    try {
      const resultado = await this.pedidoPratoRepository
        .createQueryBuilder('pedido_prato')
        .select([
          'pedido.id','pedido_prato.id','prato.nome AS `Nome do prato`',
          'pedido.nome_cliente AS `Nome do cliente`',
          'pedido.em_atendimento AS `Em atendimento`',
          'pedido.data_hora_pedido AS `Data/Hora pedido`',
          'pedido.numero_mesa AS `Número da mesa`',
        ])
        .innerJoin('pedido_prato.pedido', 'pedido', 'pedido_prato.id_pedido = pedido.id')
        .innerJoin('pedido_prato.prato', 'prato', 'pedido_prato.id_prato = prato.id')
        .getRawMany();

      return resultado;
    } catch (error) {
      throw new Error(`Erro ao executar a consulta: ${error.message}`);
    }
  }

  //Buscar na tabela pedido_prato por ID ===============================================================
  async realizarConsultaPorId(pedidoPratoId: number): Promise<any> {
    try {
      const resultado = await this.pedidoPratoRepository
        .createQueryBuilder('pedido_prato')
        .select([
          'prato.nome AS `Nome do prato`',
          'pedido.nome_cliente AS `Nome do cliente`',
          'pedido.em_atendimento AS `Em atendimento`',
          'pedido.data_hora_pedido AS `Data/Hora pedido`',
          'pedido.numero_mesa AS `Número da mesa`',
        ])
        .innerJoin('pedido_prato.pedido', 'pedido', 'pedido_prato.id_pedido = pedido.id')
        .innerJoin('pedido_prato.prato', 'prato', 'pedido_prato.id_prato = prato.id')
        .where('pedido_prato.id = :id', { id: pedidoPratoId })
        .getRawOne();

      if (!resultado) {
        throw new NotFoundException(`PedidoPrato com ID ${pedidoPratoId} não encontrado`);
      }

      return resultado;
    } catch (error) {
      throw new Error(`Erro ao executar a consulta: ${error.message}`);
    }

}

async deletePorId(id: number): Promise<string> {
  const pedidoPrato = await this.pedidoPratoRepository.findOne({ where: { id } });

  if (!pedidoPrato) {
    throw new NotFoundException(`PedidoPrato com ID ${id} não encontrado`);
  }else{
  await this.pedidoPratoRepository.remove(pedidoPrato);
  return `PedidoPrato com ID ${id} foi removido com sucesso`;
  }
}
}

//==========================================================================================================

