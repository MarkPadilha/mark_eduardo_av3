export class CreatePedidoDto {
    nome_completo: string;
    status_pedido: boolean;
    em_atendimento:boolean;
    data_hora_pedido: Date;
    numero_mesa: number;
    prato: number;
    preco_total: number
  }