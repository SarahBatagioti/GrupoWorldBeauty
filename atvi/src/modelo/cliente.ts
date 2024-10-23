import Cpf from "./cpf"
import Produto from "./produtos"
import Rg from "./rg"
import Servico from "./servico"
import Telefones from "./telefone"

export default class Cliente {
    public nome!: string
    public nomeSocial!: string
    private cpf!: Cpf
    private rgs!: Array<Rg>
    private dataCriacao!: Date
    private telefones!: Array<Telefones>
    private produtosConsumidos!: Array<Produto>
    private servicosConsumidos!: Array<Servico>

    constructor(nome: string, nomeSocial: string, cpf: Cpf){
        this.nome = nome
        this.nomeSocial = nomeSocial
        this.cpf = cpf
    }

    public get getCpf(): Cpf{
        return this.cpf
    }
    public get getRgs(): Array<Rg> {
        return this.rgs
    }
    public get getDataCadastro(): Date {
        return this.dataCriacao
    }
    public get getTelefones(): Array<Telefones> {
        return this.telefones
    }
    public get getProdutosCosumidos(): Array<Produto> {
        return this.produtosConsumidos
    }
    public get getServicosConsumidos(): Array<Servico> {
        return this.servicosConsumidos
    }
}