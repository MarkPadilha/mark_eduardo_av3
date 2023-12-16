import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'prato' })
export class PratoEntity{
   @PrimaryGeneratedColumn()
   id: number

   @Column({length:50})
   nome: string

   @Column()
   preco: string
}