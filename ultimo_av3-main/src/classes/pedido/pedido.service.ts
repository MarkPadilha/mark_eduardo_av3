import { Injectable } from '@nestjs/common';
import { PedidoEntity } from './pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class pedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>
  ){}
  

  private readonly pedido: PedidoEntity[] = [];
  getHello(): string {
    return 'controller do pedido.controller';
  }

  async createPedido(creatPedidoDto: CreatePedidoDto): Promise<PedidoEntity>{
    const pedido = this.pedidoRepository.create(creatPedidoDto)
    return await this.pedidoRepository.save(pedido);
  }
}
