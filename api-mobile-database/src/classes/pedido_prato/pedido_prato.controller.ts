import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PedidoPratoService } from './pedido_prato.service';

@Controller()
export class PedidoPratoController {
  constructor(private readonly pedidoPratoService: PedidoPratoService) {}

  @Get('/allpedido_prato')
async buscarTodos() {
  try {
    const pedidoPratos = await this.pedidoPratoService.realizarConsulta();
    return { data: pedidoPratos };
  } catch (error) {
    return { error: 'Falha ao buscar pedido_pratos', message: error.message };
  }
}

  @Get(':id') // request que espera um parâmetro de ID ===============================================
async buscarPorId(@Param('id', ParseIntPipe) pedidoPratoId: number): Promise<any> {
  return this.pedidoPratoService.realizarConsultaPorId(pedidoPratoId);
}

@Delete(':id/deletepedido')
async deletePedidoPrato(@Param('id') id: number): Promise<void> {
  await this.pedidoPratoService.deletePorId(id);
}

}