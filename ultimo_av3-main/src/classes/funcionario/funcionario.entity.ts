import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'funcionario' })
export class FuncionarioEntity{
   @PrimaryGeneratedColumn()
   id: number

   @Column()
   nome_funcionario: string

   @Column({length:50})
   login: string

   @Column()
   senha: string

}