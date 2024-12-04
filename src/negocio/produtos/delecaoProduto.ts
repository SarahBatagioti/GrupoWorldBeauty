import Produto from "../../modelo/produtos";
import Deletar from "../delecao";
import Entrada from "../../io/entrada";

export default class DeletarProduto extends Deletar {
  private produtos: Produto[];

  constructor(produtos: Produto[]) {
    super();
    this.produtos = produtos;
  }

  public async deletar(): Promise<void> {
    const entrada = new Entrada();
    const nomeProduto = await entrada.receberTexto("Escreva o nome do produto que você deseja deletar: ");

    const index = this.produtos.findIndex((produto) => produto.nome === nomeProduto);

    if (index !== -1) {
      this.produtos.splice(index, 1);
      console.log(`\nProduto ${nomeProduto} deletado com sucesso.\n`);
    } else {
      console.log("\nEste produto não foi encontrado!\n");
    }
  }
}
