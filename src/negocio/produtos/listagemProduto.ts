import Produto from "../../modelo/produtos";
import Listagem from "../listagem";

export default class ListagemProdutos extends Listagem {
  private produtos: Produto[];

  constructor(produtos: Produto[]) {
    super();
    this.produtos = produtos;
  }

  public listar(): void {
    this.visualizar();
  }

  public visualizar(): void {
    console.log("\nLista de todos os produtos:");

    this.produtos.forEach((produto) => {
      console.log(`Nome: ${produto.nome}`);
      console.log(`Preço: R$ ${produto.preco.toFixed(2)}`);
      console.log("--------------------------------------");
    });

    console.log("\n");
  }
}