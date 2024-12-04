import Cliente from "../../modelo/cliente";
import Entrada from "../../io/entrada";

export default class ListarCompra {
  private clientes: Cliente[];

  constructor(clientes: Cliente[]) {
    this.clientes = clientes;
  }

  public listarCompra(): void {
    let entrada = new Entrada();
    let cliente: Cliente | undefined;

    do {
      const cpfInput = entrada.receberTexto("Digite o CPF do cliente: ");
      cliente = this.clientes.find((c) => c.getCpf.getValor === cpfInput);
      if (!cliente) {
        console.log(`\nCliente com CPF ${cpfInput} não encontrado. Tente novamente.\n`);
      }
    } while (!cliente);

    console.log(`\nProdutos no carrinho do cliente ${cliente.nome}:`);

    let valorTotal = 0;
    cliente.getProdutosConsumidos.forEach((produto, index) => {
      const quantidade = cliente.getQuantidadeProdutosConsumidos[index];
      const subtotal = produto.preco * quantidade;
      valorTotal += subtotal;
      console.log(`${produto.nome} - Quantidade: ${quantidade}, Subtotal: R$${subtotal.toFixed(2)}`);
    });

    console.log(`\nValor total do carrinho: R$${valorTotal.toFixed(2)}\n`);
  }
}
