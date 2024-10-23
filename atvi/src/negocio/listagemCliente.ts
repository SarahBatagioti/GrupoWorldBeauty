import Cliente from "../modelo/cliente";

export default class ListagemClientes {
    private clientes!: Array<Cliente>

    constructor(clientes: Array<Cliente>){
        this.clientes = clientes
    }

    public listar(): void{
        
    }
}