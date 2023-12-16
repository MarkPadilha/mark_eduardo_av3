import { Controller, Get, Param } from '@nestjs/common';
import { PratoService } from './prato.service';
import { PratoEntity } from './prato.entity';

@Controller()
export class PratoController {
  constructor(private readonly pratoService: PratoService) {}

  @Get('/listar')
  async listarPratos(): Promise<PratoEntity[]> {
    return this.pratoService.listarPratos();
  }

  @Get(":id/preco")
  async getPrecoByPratoId(@Param('id') id: number): Promise<number| null>{
    return this.pratoService.getPrecoByPratoId(id);
  }
  
}