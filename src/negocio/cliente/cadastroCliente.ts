import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import Cpf from "../../modelo/cpf";
import Cadastro from "../cadastro";

export default class CadastroCliente extends Cadastro {
    private clientes!: Array<Cliente>;
    private entrada!: Entrada;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    // Função para validar CPF
    private validarCpf(cpf: string): boolean {
        const cpfFormatado = cpf.replace(/[^\d]+/g, '');
        return cpfFormatado.length === 11;
    }

    // Função para validar data
    private validarData(data: string): boolean {
        const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        return regex.test(data);
    }

    public cadastrar(): void {
        console.log('\nInício do cadastro do cliente');

        let nome: string;
        let nomeSocial: string;
        do {
            nome = this.entrada.receberTexto('Nome do cliente:');
            nomeSocial = this.entrada.receberTexto('Nome social do cliente:');
            if (!nome || !nomeSocial) {
                console.log(`--------------------------------------`);
                console.log("Nome e nome social não podem ser vazios. Tente novamente.");
                console.log(`--------------------------------------`);
            }
        } while (!nome || !nomeSocial);

        // Validação de CPF
        let nmrCpf: string;
        do {
            nmrCpf = this.entrada.receberTexto('Número do CPF:');
            if (!this.validarCpf(nmrCpf)) {
                console.log(`--------------------------------------`);
                console.log("CPF inválido. Certifique-se de que o CPF tenha 11 dígitos. Tente novamente.");
                console.log(`--------------------------------------`);
            }
        } while (!this.validarCpf(nmrCpf));

        let cpfEmissao: string;
        do {
            cpfEmissao = this.entrada.receberTexto('Data de emissão do CPF (formato dd/mm/aaaa):');
            if (!this.validarData(cpfEmissao)) {
                console.log(`--------------------------------------`);
                console.log("Data inválida. Utilize o formato dd/mm/aaaa. Tente novamente.");
                console.log(`--------------------------------------`);
            }
        } while (!this.validarData(cpfEmissao));

        let partesData = cpfEmissao.split('/');
        let ano = parseInt(partesData[2]);
        let mes = parseInt(partesData[1]);
        let dia = parseInt(partesData[0]);
        let dataEmissao = new Date(ano, mes - 1, dia);

        let genero: string;
        do {
            genero = this.entrada.receberTexto("Informe o gênero do cliente (M para masculino, F para feminino):").toLowerCase();
            if (genero !== 'm' && genero !== 'f') {
                console.log(`--------------------------------------`);
                console.log("Entrada inválida. Digite M para masculino ou F para feminino.");
                console.log(`--------------------------------------`);
            }
        } while (genero !== 'm' && genero !== 'f');

        let cpf = new Cpf(nmrCpf, dataEmissao);
        let cliente = new Cliente(nome, nomeSocial, cpf, genero);
        this.clientes.push(cliente);
        console.log(`\nCadastro concluído :)\n`);
    }
}
