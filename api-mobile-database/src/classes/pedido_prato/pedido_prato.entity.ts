import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { PedidoEntity } from "../pedido/pedido.entity";
import { PratoEntity } from "../prato/prato.entity";

@Entity({ name: 'pedido_prato' })
export class PedidoPratoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => PedidoEntity, pedido => pedido.id)
    @JoinColumn({ name: "id_pedido" })
    pedido: PedidoEntity;

    @ManyToOne(() => PratoEntity, prato => prato.id)
    @JoinColumn({ name: "id_prato" })
    prato: PratoEntity;
}