import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PratoEntity } from './prato.entity';


@Injectable()
export class PratoService {
  constructor(

    @InjectRepository(PratoEntity)
    private pratoRepository: Repository<PratoEntity>,
  ) {}


  async listarPratos(): Promise<PratoEntity[]> {
    return this.pratoRepository.find();
  }

  async getPrecoByPratoId(pratoId: number): Promise<number | null> {
    const prato = await this.pratoRepository.findOne(pratoId as any);
   
    return prato ? prato.preco : null;
  }
}