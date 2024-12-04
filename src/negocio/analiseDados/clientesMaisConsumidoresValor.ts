import Cliente from "../../modelo/cliente";
import Listagem from "../listagem";

export default class ClientesMaisConsumidoresValor extends Listagem {
  private clientes: Array<Cliente>;

  constructor(clientes: Array<Cliente>) {
    super();
    this.clientes = clientes;
  }

  public listar(): void {
    console.log("\nTop 5 Clientes - Maior Consumo (Valor):");
    const maiorValor = this.clientes
      .map(cliente => ({
        nome: cliente.nome,
        valor: cliente.getProdutosConsumidos.reduce((acc, produto, index) => {
          // Valida se o produto e quantidade estão definidos
          const quantidade = cliente.getQuantidadeProdutosConsumidos[index];
          if (produto && quantidade !== undefined && produto.preco !== undefined) {
            return acc + produto.preco * quantidade;
          }
          return acc;
        }, 0)
      }))
      .sort((a, b) => b.valor - a.valor)
      .slice(0, 5);

    maiorValor.forEach((cliente, index) => {
      console.log(`${index + 1}. ${cliente.nome} - Valor consumido: R$${cliente.valor.toFixed(2)}`);
    });
  }
}
