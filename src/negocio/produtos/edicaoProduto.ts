import Produto from "../../modelo/produtos";
import Entrada from "../../io/entrada";

export default class AtualizarProduto {
  private produtos: Produto[];

  constructor(produtos: Produto[]) {
    this.produtos = produtos;
  }

  public listar(): void {
    if (this.produtos.length === 0) {
      console.log("Não há produtos cadastrados.");
      return;
    }

    console.log("\nLista de produtos:");
    this.produtos.forEach((produto, index) => {
      console.log(`${index + 1} - ${produto.nome} (R$ ${produto.preco.toFixed(2)})`);
    });
    console.log("\n");
  }

  public async editar(): Promise<void> {
    const entrada = new Entrada();

    this.listar();

    const nomeProduto = await entrada.receberTexto(
      "Escreva o nome do produto que você deseja atualizar: "
    );

    const produto = this.produtos.find(
      (produto) => produto.nome.toLowerCase() === nomeProduto.toLowerCase()
    );

    if (produto) {
      let novoNome: string;
      let novoPreco: number;

      do {
        novoNome = await entrada.receberTexto(
          `Novo nome para o produto (atualmente: ${produto.nome}):`
        );
        if (!novoNome.trim()) {
          console.log("O nome do produto não pode ser vazio. Tente novamente.");
        }
      } while (!novoNome.trim()); // Garante que o nome não seja vazio

      do {
        novoPreco = await entrada.receberNumero(
          `Novo preço para o produto (atualmente: ${produto.preco}):`
        );
        if (isNaN(novoPreco) || novoPreco < 0) {
          console.log("O preço deve ser um número válido e não pode ser negativo. Tente novamente.");
        }
      } while (isNaN(novoPreco) || novoPreco < 0); // Garante que o preço seja um número válido e não negativo

      produto.nome = novoNome;
      produto.preco = novoPreco;

      console.log("\nProduto atualizado com sucesso.\n");
    } else {
      console.log("\nProduto não encontrado!\n");
    }
  }
}
