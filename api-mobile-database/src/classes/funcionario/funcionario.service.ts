import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FuncionarioEntity } from './funcionario.entity';

@Injectable()
export class FuncionarioService{
    constructor(
        @InjectRepository(FuncionarioEntity)
        private funcionarioRepository: Repository<FuncionarioEntity>,
      ) {}

      //Buscar nome e senha do funcionário passando o parâmetro de ID
      async getLoginSenhaFuncionario(id: number): Promise<{ login: string; senha: string } | null> {
        const funcionario = await this.funcionarioRepository.findOne({
          where: { id },
          select: ['login', 'senha'],
        });
      
        return funcionario ? { login: funcionario.login, senha: funcionario.senha } : null;
      }

      //Buscar nome do funcionário passando os parâmetros de login e senha
      async getNomeFuncionarioByLoginSenha(login: string, senha: string): Promise<string | null> {
        const funcionario = await this.funcionarioRepository.findOne({
          where: { login, senha },
          select: ['nome_funcionario'],
        });
    
        return funcionario ? funcionario.nome_funcionario : null;
      }
            
//==========================================================================================================

    }