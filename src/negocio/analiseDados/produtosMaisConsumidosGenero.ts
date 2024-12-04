import Cliente from "../../modelo/cliente";
import Listagem from "../listagem";

export default class ProdutosMaisConsumidosGenero extends Listagem {
  private clientes: Array<Cliente>;

  constructor(clientes: Array<Cliente>) {
    super();
    this.clientes = clientes;
  }

  public listar(): void {
    console.log("\nProdutos Mais Consumidos por Gênero:");
    const consumoPorGenero = new Map<string, Map<string, number>>();

    this.clientes.forEach(cliente => {
      const genero = cliente.getGenero;
      if (!consumoPorGenero.has(genero)) consumoPorGenero.set(genero, new Map());

      cliente.getProdutosConsumidos.forEach((produto, index) => {
        const quantidade = cliente.getQuantidadeProdutosConsumidos[index];
        if (produto && quantidade !== undefined) {
          const produtoMap = consumoPorGenero.get(genero)!;
          produtoMap.set(produto.nome, (produtoMap.get(produto.nome) || 0) + quantidade);
        }
      });

    });

    consumoPorGenero.forEach((produtos, genero) => {
      console.log(`\nGênero: ${genero}`);
      Array.from(produtos.entries())
        .sort((a, b) => b[1] - a[1])
        .forEach(([produto, quantidade]) => {
          console.log(`${produto} - Quantidade consumida: ${quantidade}`);
        });
    });
  }
}
