import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Cadastro from "./cadastro";

export default class CadastroCliente extends Cadastro {
    private clientes!: Array<Cliente>
    private entrada!: Entrada

    constructor(clientes: Array<Cliente>){
        super()
    }

    public cadastrar(): void {}

}