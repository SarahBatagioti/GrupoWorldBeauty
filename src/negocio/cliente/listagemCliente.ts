import Cliente from "../../modelo/cliente";
import Listagem from "../listagem";

export default class ListagemClientes extends Listagem{
    private clientes!: Array<Cliente>

    constructor(clientes: Array<Cliente>){
        super()
        this.clientes = clientes
    }

    public listar(): void{
        console.log('\nLista de todos os clientes:')
        this.clientes.forEach(clientes => {
            console.log('Nome: ' + clientes.nome)
            console.log('Nome social: ' + clientes.nomeSocial)
            console.log('Gênero: ' + clientes.getGenero);
            console.log('CPF: ' + clientes.getCpf.getValor)
            console.log(`--------------------------------------`)
        })
        console.log(`\n`);
    }
}