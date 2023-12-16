import { Controller, Put, Param, ParseIntPipe } from '@nestjs/common';
import { pedidoService } from './pedido.service';
import { PedidoEntity } from './pedido.entity';

@Controller()
export class pedidoController {
  constructor(private readonly pedidoService: pedidoService) {}
  
  @Put(':id/atendimento_invert')
  async atualizarParaAtendimento(@Param('id', ParseIntPipe) id: number): Promise<PedidoEntity | undefined> {
    return this.pedidoService.inverterStatusAtendimento(id);
  }


}
