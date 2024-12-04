import Cliente from "../../modelo/cliente";
import Listagem from "../listagem";

export default class ClientesMaisConsumidores extends Listagem {
  private clientes: Array<Cliente>;

  constructor(clientes: Array<Cliente>) {
    super();
    this.clientes = clientes;
  }

  public listar(): void {
    console.log("\nTop 10 Clientes - Maior Consumo (Quantidade)");
    const topClientes = this.clientes
      .map(cliente => {
        const quantidade = cliente.getProdutosConsumidos.reduce((acc, _, index) => {
          const quantidade = cliente.getQuantidadeProdutosConsumidos[index];
          return quantidade !== undefined ? acc + quantidade : acc;
        }, 0);

        return { nome: cliente.nome, quantidade };
      })
      .sort((a, b) => b.quantidade - a.quantidade)
      .slice(0, 10);

    topClientes.forEach((cliente, index) => {
      console.log(`${index + 1}. ${cliente.nome} - Quantidade consumida: ${cliente.quantidade}`);
    });
  }
}
