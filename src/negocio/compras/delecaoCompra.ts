import Cliente from "../../modelo/cliente";
import Entrada from "../../io/entrada";
import Produto from "../../modelo/produtos";

export default class DeletarCompra {
  private clientes: Cliente[];
  private produtos: Produto[];

  constructor(clientes: Cliente[], produtos: Produto[]) {
    this.clientes = clientes;
    this.produtos = produtos;
  }

  public removerCompra(): void {
    const entrada = new Entrada();
    let cliente: Cliente | undefined;

    do {
      const cpfInput = entrada.receberTexto("Digite o CPF do cliente: ");
      if (!cpfInput) {
        console.log("\nCPF não pode estar vazio. Tente novamente.\n");
        continue;
      }
      cliente = this.clientes.find((c) => c.getCpf.getValor === cpfInput);
      if (!cliente) {
        console.log(`\nCliente com CPF ${cpfInput} não encontrado. Tente novamente.\n`);
      }
    } while (!cliente);

    let produtoRemovido = false;
    do {
      const nomeProduto = entrada.receberTexto("Digite o nome do produto a ser removido: ");
      if (!nomeProduto) {
        console.log("\nNome do produto não pode estar vazio. Tente novamente.\n");
        continue;
      }
      const indiceProduto = cliente.getProdutosConsumidos.findIndex((produto) => produto.nome === nomeProduto);

      if (indiceProduto !== -1) {
        cliente.getProdutosConsumidos.splice(indiceProduto, 1);
        cliente.getQuantidadeProdutosConsumidos.splice(indiceProduto, 1);
        console.log("\nProduto removido com sucesso!\n");
        produtoRemovido = true;
      } else {
        console.log(`\nProduto ${nomeProduto} não encontrado no carrinho. Tente novamente.\n`);
      }
    } while (!produtoRemovido);
  }
}
