import { Module } from "@nestjs/common";
import { pedidoController } from "./pedido.controller";
import { pedidoService } from "./pedido.service";
import { PedidoEntity } from "./pedido.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([PedidoEntity])],
    controllers: [pedidoController],
    providers: [pedidoService]
})

    export class PedidoModule {}
