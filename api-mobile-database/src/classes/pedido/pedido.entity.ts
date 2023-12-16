import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity({ name: 'pedido' })
export class PedidoEntity{
   @PrimaryGeneratedColumn()
   id: number

   @Column({length:50})
   nome_cliente: string

   @Column()
   status_pedido: boolean

   @Column()
   em_atendimento: boolean

   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
   data_hora_pedido: Date;

   @Column()
   numero_mesa: number;

   @Column()
   prato: number;
   
}