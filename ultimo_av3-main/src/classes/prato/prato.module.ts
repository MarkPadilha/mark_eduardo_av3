import { Module } from "@nestjs/common";
import { PratoController } from "./prato.controller";
import { PratoService } from "./prato.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PratoEntity } from "./prato.entity";

@Module({
    imports: [TypeOrmModule.forFeature([PratoEntity])],
    controllers: [PratoController],
    providers: [PratoService]
})

    export class PratoModule {}
