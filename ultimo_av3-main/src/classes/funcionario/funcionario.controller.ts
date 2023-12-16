import { Controller, Post, Get, Param } from "@nestjs/common";
import { FuncionarioService } from "./funcionario.service";

@Controller()
export class FuncionarioController{
    constructor(private readonly funcionarioService: FuncionarioService) {}

    //Buscar login e senha do funcionário passando o ID como parâmetro;
    @Get('/:id/login-senha')
    async getLoginSenha(@Param('id') id: number): Promise<{ login: string; senha: string } | null> {
      return this.funcionarioService.getLoginSenhaFuncionario(id);
    }

    //Buscar Nome do funcionário passando o parâmetro login e senha;
    @Get('/:login/:senha')
    async getNomeFuncionario(@Param('login') login: string, @Param('senha') senha: string): Promise<string | null> {
    return this.funcionarioService.getNomeFuncionarioByLoginSenha(login, senha);
  }

}