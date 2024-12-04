import Cpf from "./cpf"
import Produto from "./produtos"
import Rg from "./rg"
import Servico from "./servicos"
import Telefones from "./telefone"

export default class Cliente {
    public nome!: string
    public nomeSocial!: string
    public genero: string
    private cpf!: Cpf
    private rgs!: Array<Rg>
    private dataCriacao!: Date
    private telefones!: Array<Telefones>
    private produtosConsumidos!: Array<Produto>
    private servicosConsumidos!: Array<Servico>
    private quantidadeProdutosConsumidos: Array<number>

    constructor(nome: string, nomeSocial: string, cpf: Cpf, genero:string,){
        this.nome = nome
        this.nomeSocial = nomeSocial
        this.genero = genero
        this.cpf = cpf
        this.rgs = []
        this.dataCriacao= new Date()
        this.telefones = []
        this.produtosConsumidos = []
        this.servicosConsumidos = []
        this.quantidadeProdutosConsumidos = []
    }

    public get getCpf(): Cpf{
        return this.cpf
    }
    public get getGenero(): string {
        return this.genero;
    }
    public get getRgs(): Array<Rg> {
        return this.rgs
    }
    public get getDataCriacao(): Date {
        return this.dataCriacao
    }
    public get getTelefones(): Array<Telefones> {
        return this.telefones
    }
    public get getProdutosConsumidos(): Array<Produto> {
        return this.produtosConsumidos
    }
    public get getQuantidadeProdutosConsumidos(): Array<number> {
        return this.quantidadeProdutosConsumidos
    }
    public get getServicosConsumidos(): Array<Servico> {
        return this.servicosConsumidos
    }
    public adicionarProduto(produto: Produto): void {
        this.produtosConsumidos.push(produto);
    }
    public adicionarQuantidadeProduto(quantidade: number): void {
        this.quantidadeProdutosConsumidos.push(quantidade);
    }

    public adicionarProdutoComQuantidade(produto: Produto, quantidade: number): void {
        this.produtosConsumidos.push(produto);
        this.quantidadeProdutosConsumidos.push(quantidade);
    }
    
}