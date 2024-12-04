import Entrada from "../../io/entrada";
import Produto from "../../modelo/produtos";
import Cadastro from "../cadastro";

export default class CadastroProduto extends Cadastro {
  private entrada: Entrada;
  private produtos: Produto[];

  constructor(produtos: Produto[]) {
    super();
    this.produtos = produtos;
    this.entrada = new Entrada();
  }

  public cadastrar(): void {
    console.log("Iniciando o cadastro de um produto");

    let nome: string;
    do {
      nome = this.entrada.receberTexto("Digite o nome do produto: ");
      if (!nome.trim()) {
        console.log("O nome do produto não pode ser vazio. Tente novamente.");
      }
    } while (!nome.trim());

    let preco: number;
    do {
      preco = this.entrada.receberNumero("Digite o preço do produto: ");
      if (isNaN(preco) || preco < 0) {
        console.log("O preço do produto deve ser um valor maior que 0. Tente novamente.");
      }
    } while (isNaN(preco) || preco < 0);

    const produto = new Produto(nome, preco);
    this.produtos.push(produto);

    console.log("\nProduto cadastrado com sucesso!\n");
  }
}