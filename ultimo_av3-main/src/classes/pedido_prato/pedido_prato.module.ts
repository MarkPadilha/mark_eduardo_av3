import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoPratoService } from './pedido_prato.service';
import { PedidoEntity } from '../pedido/pedido.entity';
import { PedidoPratoController } from './pedido_prato.controller';
import { PedidoPratoEntity } from './pedido_prato.entity';
import { pedidoController } from '../pedido/pedido.controller';
import { pedidoService } from '../pedido/pedido.service';
import { PratoController } from '../prato/prato.controller';
import { PratoService } from '../prato/prato.service';
import { PratoEntity } from '../prato/prato.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PedidoPratoEntity,PedidoEntity,
  PratoEntity])],
  controllers: [PedidoPratoController, pedidoController, PratoController],
  providers: [PedidoPratoService, pedidoService, PratoService]
})
export class PedidoPratoModule {}