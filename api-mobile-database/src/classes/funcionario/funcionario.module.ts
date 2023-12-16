import { Module } from "@nestjs/common";
import { FuncionarioController } from "./funcionario.controller";
import { FuncionarioService } from "./funcionario.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FuncionarioEntity } from "./funcionario.entity";

@Module({
    imports: [TypeOrmModule.forFeature([FuncionarioEntity])],
    controllers: [FuncionarioController],
    providers: [FuncionarioService]
})

    export class FuncionarioModule {}
