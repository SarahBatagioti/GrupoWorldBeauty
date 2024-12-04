import Cliente from "../../modelo/cliente";
import Cpf from "../../modelo/cpf";
import Entrada from "../../io/entrada";
import Delecao from "../delecao";

export default class DeletarCliente extends Delecao {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public listar(): void {
        console.log("\nLista de todos os clientes:");
        this.clientes.forEach(cliente => {
            console.log('Nome: ' + cliente.nome);
            console.log('Nome social: ' + cliente.nomeSocial);
            console.log('CPF: ' + cliente.getCpf.getValor);
            console.log('--------------------------------------');
        });
        console.log("\n");
    }

    public deletar(): void {
        let cpfCliente = this.entrada.receberTexto('Informe o CPF do cliente a ser deletado:');
        let cpf = new Cpf(cpfCliente, new Date()); // Não precisa da data de emissão para deletar

        const indiceCliente = this.clientes.findIndex(cliente => cliente.getCpf.getValor === cpf.getValor);

        if (indiceCliente !== -1) {
            this.clientes.splice(indiceCliente, 1); // Remove o cliente
            console.log("\nCliente deletado com sucesso!");
        } else {
            console.log("\nCliente não encontrado.");
        }
    }
}
