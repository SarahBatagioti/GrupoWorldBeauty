import Produto from "../../modelo/produtos";
import Cliente from "../../modelo/cliente";
import Listagem from "../listagem";

export default class ProdutosMaisConsumidos extends Listagem {
  private clientes: Array<Cliente>;

  constructor(clientes: Array<Cliente>) {
    super();
    this.clientes = clientes;
  }

  public listar(): void {
    console.log("\nProdutos/Serviços Mais Consumidos:");
    const consumo = new Map<string, number>();

    this.clientes.forEach(cliente => {
      cliente.getProdutosConsumidos.forEach((produto, index) => {
        const quantidade = cliente.getQuantidadeProdutosConsumidos[index];
        if (produto && quantidade !== undefined) {
            consumo.set(produto.nome, (consumo.get(produto.nome) || 0) + quantidade);
        }
    });    
    });

    const produtosOrdenados = Array.from(consumo.entries())
      .sort((a, b) => b[1] - a[1]);

    produtosOrdenados.forEach(([produto, quantidade]) => {
      console.log(`${produto} - Quantidade consumida: ${quantidade}`);
    });
  }
}
