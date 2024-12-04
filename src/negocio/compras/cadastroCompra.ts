import Cliente from "../../modelo/cliente";
import Entrada from "../../io/entrada";
import Produto from "../../modelo/produtos";

export default class AdicionarCompra {
  private clientes: Cliente[];
  private produtos: Produto[];

  constructor(clientes: Cliente[], produtos: Produto[]) {
    this.clientes = clientes;
    this.produtos = produtos;
  }

  public adicionar(): void {
    let entrada = new Entrada();
    let cliente: Cliente | undefined;

    do {
      const cpfInput = entrada.receberTexto("Digite o CPF do cliente: ");
      cliente = this.clientes.find((c) => c.getCpf.getValor === cpfInput);
      if (!cliente) {
        console.log(`\nCliente com CPF ${cpfInput} não encontrado. Tente novamente.\n`);
      }
    } while (!cliente);

    let continuarAdicionando = true;

    while (continuarAdicionando) {

      let produto: Produto | undefined;
      do {
        const nomeProduto = entrada.receberTexto("Digite o nome do produto: ");
        produto = this.produtos.find((p) => p.nome === nomeProduto);
        if (!produto) {
          console.log(`\nProduto "${nomeProduto}" não encontrado. Tente novamente.\n`);
        }
      } while (!produto);

      const quantidade = entrada.receberNumero("Digite a quantidade desse produto no carrinho: ");
      cliente.adicionarProduto(produto!);
      cliente.adicionarQuantidadeProduto(quantidade);

      console.log("\nProduto(s) adicionado(s) com sucesso!\n");

      // Perguntar se o usuário quer adicionar mais produtos
      let resposta: string;
      do {
        resposta = entrada
          .receberTexto("Deseja adicionar mais produtos? Digite 's' para sim ou 'n' para não: ")
          .toLowerCase();

        if (resposta !== 's' && resposta !== 'n') {
          console.log("Comando indisponível, aperte 's' para Sim e 'n' para Não.");
        }
      } while (resposta !== 's' && resposta !== 'n');

      // Definir se continua ou não
      continuarAdicionando = resposta === 's';
    }

    console.log("\nTodos os produtos foram adicionados ao carrinho com sucesso!\n");
  }
}
