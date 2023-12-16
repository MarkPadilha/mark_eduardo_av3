import { Controller, Get } from '@nestjs/common';
import { PratoService } from './prato.service';
import { PratoEntity } from './prato.entity';

@Controller()
export class PratoController {
  constructor(private readonly pratoService: PratoService) {}

  @Get('//allprato')
  async listarPratos(): Promise<PratoEntity[]> {
    return this.pratoService.listarPratos();
  }
}

//==========================================================================================================