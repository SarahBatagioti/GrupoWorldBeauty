import Entrada from "../io/entrada";
import Empresa from "../modelo/empresa";
import CadastroCliente from "../negocio/cliente/cadastroCliente";
import ListagemClientes from "../negocio/cliente/listagemCliente";
import EditarCliente from "../negocio/cliente/edicaoCliente";
import DeletarCliente from "../negocio/cliente/delecaoCliente";
import ListagemProdutos from "../negocio/produtos/listagemProduto";
import AtualizarProduto from "../negocio/produtos/edicaoProduto";
import DeletarProduto from "../negocio/produtos/delecaoProduto";
import CadastroProduto from "../negocio/produtos/cadastroProduto";
import AdicionarCompra from "../negocio/compras/cadastroCompra";
import DeletarCompra from "../negocio/compras/delecaoCompra";
import ListarCompra from "../negocio/compras/listagemCompra";
import ClientesMenosConsumidores from "../negocio/analiseDados/clientesMenosConsumidores";
import ClientesMaisConsumidores from "../negocio/analiseDados/clientesMaisConsumidores";
import cadastroProdutos from "./Cadastros/produtos";
import cadastroClientes from "./Cadastros/clientes";
import ClientesGenero from "../negocio/analiseDados/clientesGenero";
import ProdutosMaisConsumidos from "../negocio/analiseDados/produtosMaisConsumidos";
import ProdutosMaisConsumidosGenero from "../negocio/analiseDados/produtosMaisConsumidosGenero";
import ClientesMaisConsumidoresValor from "../negocio/analiseDados/clientesMaisConsumidoresValor";

console.log('Seja bem-vindo(a)');
let empresa = new Empresa();
let execucao = true;

let produtos = cadastroProdutos();
produtos.forEach(produto => empresa.adicionarProduto(produto))

let clientes = cadastroClientes();
clientes.forEach(clientes => empresa.adicionarCliente(clientes))

const main = async () => {
  while (execucao) {
    console.log("--------------------------------------");
    console.log("ADMINISTRAÇÃO DE CLIENTES");
    console.log("--------------------------------------");
    console.log("1 - Cadastrar cliente");
    console.log("2 - Listar todos os clientes");
    console.log("3 - Editar cliente");
    console.log("4 - Deletar cliente");
    console.log("--------------------------------------");
    console.log("GESTÃO DE PRODUTOS");
    console.log("--------------------------------------");
    console.log("5 - Cadastrar novo produto");
    console.log("6 - Visualizar todos os produtos");
    console.log("7 - Atualizar informações de um produto");
    console.log("8 - Excluir um produto");
    console.log("--------------------------------------");
    console.log("COMPRAS");
    console.log("--------------------------------------");
    console.log("9 - Adicionar compra de um cliente");
    console.log("10 - Excluir compra de um cliente");
    console.log("11 - Lista de compra de um cliente");
    console.log("--------------------------------------");
    console.log("---------- ANÁLISES DE DADOS ----------");
    console.log("--------------------------------------");
    console.log("12 - Ver 10 clientes que mais consomem");
    console.log("13 - Ver todos os clientes por genero");
    console.log("14 - Ver produtos mais consumidos");
    console.log("15 - Ver produtos mais consumidos por gênero");
    console.log("16 - Ver 10 clientes que menos consumiram");
    console.log("17 - Ver 5 clientes que mais consomem (em valor)");
    console.log("--------------------------------------");
    console.log("OPERAÇÕES");
    console.log("--------------------------------------");
    console.log("0 - Sair");

    let entrada = new Entrada();
    let opcao = await entrada.receberNumero('Escolha uma opção:');  // Agora aguardamos a resposta

    switch (opcao) {
      case 1:
        let cadastro = new CadastroCliente(empresa.getClientes);
        await cadastro.cadastrar();  // Aguarda a operação de cadastro
        break;
      case 2:
        let listagem = new ListagemClientes(empresa.getClientes);
        listagem.listar();
        break;
      case 3:
        let editar = new EditarCliente(empresa.getClientes);
        editar.listar();  // Listagem de clientes antes da edição
        await editar.editar();  // Aguarda a edição do cliente
        break;
      case 4:
        let deletar = new DeletarCliente(empresa.getClientes);
        deletar.listar();
        await deletar.deletar();  // Aguarda a exclusão de um cliente
        break;
      case 5:
        let cadastroProduto = new CadastroProduto(empresa.getProdutos);
        await cadastroProduto.cadastrar();  // Aguarda o cadastro do produto
        break;
      case 6:
        let listagemProdutos = new ListagemProdutos(empresa.getProdutos);
        listagemProdutos.visualizar();
        break;
      case 7:
        let atualizarProduto = new AtualizarProduto(empresa.getProdutos);
        await atualizarProduto.editar();  // Aguarda a edição de um produto
        break;
      case 8:
        let deletarProduto = new DeletarProduto(empresa.getProdutos);
        await deletarProduto.deletar();  // Aguarda a exclusão de um produto
        break;
      case 9:
        let adicionarCompra = new AdicionarCompra(empresa.getClientes, empresa.getProdutos);
        await adicionarCompra.adicionar();  // Aguarda a adição de uma compra
        break;
      case 10:
        let deletarCompra = new DeletarCompra(empresa.getClientes, empresa.getProdutos);
        await deletarCompra.removerCompra();  // Aguarda a remoção de uma compra
        break;
      case 11:
        let listagemCompra = new ListarCompra(empresa.getClientes);
        listagemCompra.listarCompra();
        break;
      case 12:
        const clientesMaisConsumidores = new ClientesMaisConsumidores(empresa.getClientes);
        clientesMaisConsumidores.listar();
        break;
      case 13:
        const clientesGenero = new ClientesGenero(empresa.getClientes);
        clientesGenero.listar();
        break;
      case 14:
        const produtosMaisConsumidos = new ProdutosMaisConsumidos(empresa.getClientes);
        produtosMaisConsumidos.listar();
        break;
      case 15:
        const produtosMaisConsumidosGenero = new ProdutosMaisConsumidosGenero(empresa.getClientes);
        produtosMaisConsumidosGenero.listar();
        break;
      case 16:
        const clientesMenosConsumidores = new ClientesMenosConsumidores(empresa.getClientes)
        clientesMenosConsumidores.listar()
        break;
      case 17:
        const clientesMaisConsumidoresValor = new ClientesMaisConsumidoresValor(empresa.getClientes)
        clientesMaisConsumidoresValor.listar()
        break
      case 0:
        execucao = false
        console.log('Até mais');
        break;
      default:
        console.log('Operação não entendida :(');
    }
  }
};

// Chama a função principal de forma assíncrona
main().catch((err) => {
  console.error("Erro inesperado: ", err);
});
