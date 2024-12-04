import Cliente from "../../modelo/cliente";
import Listagem from "../listagem";

export default class ClientesMenosConsumidores extends Listagem {
  private clientes: Array<Cliente>;

  constructor(clientes: Array<Cliente>) {
    super();
    this.clientes = clientes;
  }

  public listar(): void {
    console.log("\nTop 10 Clientes - Menor Consumo:");
    const menorConsumo = this.clientes
      .map(cliente => ({
        nome: cliente.nome,
        quantidade: cliente.getProdutosConsumidos.reduce((acc, _, index) => acc + cliente.getQuantidadeProdutosConsumidos[index], 0)
      }))
      .sort((a, b) => a.quantidade - b.quantidade)
      .slice(0, 10);

    menorConsumo.forEach((cliente, index) => {
      console.log(`${index + 1}. ${cliente.nome} - Quantidade consumida: ${cliente.quantidade}`);
    });
  }
}
