import { Controller, Get, Body, Post } from '@nestjs/common';
import { pedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';


@Controller()
export class pedidoController {
  constructor(private readonly pedidoService: pedidoService) {}

  @Get('/TESTEGETPEDIDO')
  getHello(): string {
    return this.pedidoService.getHello();
  }

  @Post('/post')
  async create(@Body() createPedidoDto: CreatePedidoDto){
    const createdPedido = await this.pedidoService.createPedido(createPedidoDto);
    
    if (createdPedido && createdPedido.id) {
        return { id: createdPedido.id, message: "Pedido realizado com sucesso" };
    } else {
        return { id: null, message: "Erro ao criar o pedido" };
    }
}

}
