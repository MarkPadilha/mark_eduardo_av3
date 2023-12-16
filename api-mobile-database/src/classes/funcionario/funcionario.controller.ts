import { Controller, Post, Get, Param } from "@nestjs/common";
import { FuncionarioService } from "./funcionario.service";

@Controller()
export class FuncionarioController{
    constructor(private readonly funcionarioService: FuncionarioService) {}

    //Buscar Nome do funcionário passando o parâmetro login e senha;
    @Get('/:login/:senha')
    async getNomeFuncionario(@Param('login') login: string, @Param('senha') senha: string): Promise<string | null> {
    return this.funcionarioService.getNomeFuncionarioByLoginSenha(login, senha);
  }

}