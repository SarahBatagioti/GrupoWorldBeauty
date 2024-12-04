import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import Cpf from "../../modelo/cpf";
import Edicao from "../edicao";

export default class EditarCliente extends Edicao {
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
            console.log('CPF: ' + cliente.getCpf.getValor);
            console.log('--------------------------------------');
        });
        console.log("\n");
    }

    public async editar(): Promise<void> {
        const cpfCliente = await this.entrada.receberTexto('Informe o CPF do cliente a ser editado:');
        const cpf = new Cpf(cpfCliente, new Date());

        const cliente = this.clientes.find(cliente => cliente.getCpf.getValor === cpf.getValor);

        if (cliente) {

            let novoNome: string;
            let novoNomeSocial: string;
            let novoGenero: string;

            do {
                novoNome = await this.entrada.receberTexto(`Novo nome para o cliente (atualmente: ${cliente.nome}):`);
                novoNomeSocial = await this.entrada.receberTexto(`Novo nome social (atualmente: ${cliente.nomeSocial}):`);
                novoGenero = await this.entrada.receberTexto(`Informe o novo gênero (M para masculino, F para feminino):`).toLowerCase();

                if (!novoNome || !novoNomeSocial) {
                    console.log(`--------------------------------------`);
                    console.log("Nome e nome social não podem ser vazios. Tente novamente.");
                    console.log(`--------------------------------------`);
                }

                if (novoGenero !== 'm' && novoGenero !== 'f') {
                    console.log(`--------------------------------------`);
                    console.log("Entrada inválida. Digite M para masculino ou F para feminino.");
                    console.log(`--------------------------------------`);
                }
            } while (!novoNome || !novoNomeSocial || (novoGenero !== 'm' && novoGenero !== 'f'));

            cliente.nome = novoNome;
            cliente.nomeSocial = novoNomeSocial;
            cliente.genero = novoGenero;

            console.log("\nCliente editado com sucesso!");
        } else {
            console.log("\nCliente não encontrado.");
        }
    }
}
