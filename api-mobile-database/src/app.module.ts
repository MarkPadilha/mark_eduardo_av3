import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuncionarioModule } from './classes/funcionario/funcionario.module';
import { PedidoModule } from './classes/pedido/pedido.module';
import { PedidoPratoModule } from './classes/pedido_prato/pedido_prato.module';
import { PratoModule } from './classes/prato/prato.module';
import { PedidoPratoEntity } from './classes/pedido_prato/pedido_prato.entity';
import { PedidoPratoService } from './classes/pedido_prato/pedido_prato.service';




@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '17092022',
      database: 'dbrestaurante',
      retryAttempts: 10,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
  }), FuncionarioModule, PedidoModule, PedidoPratoModule, PratoModule],

  controllers: [],
  providers: [],
})
export class AppModule {}
