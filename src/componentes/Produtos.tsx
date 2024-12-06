import React, { Component } from "react";

type props = {
    tema: string;
};

type state = {
    produtos: { nome: string; preco: string }[];
    nome: string;
    preco: string;
};

export default class FormularioCadastroProduto extends Component<props, state> {
    constructor(props: props) {
        super(props);
        this.state = {
            produtos: [],
            nome: "",
            preco: ""
        };
        this.adicionarProduto = this.adicionarProduto.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        // Validação específica para cada campo
        let newValue = value;
        if (name === "preco") {
            newValue = value.replace(/[^0-9]/g, ""); // Permite apenas números
        }

        this.setState({ [name]: newValue } as unknown as Pick<state, keyof state>);
    }

    adicionarProduto(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const { nome, preco } = this.state;

        if (!nome || !preco) {
            alert("Todos os campos são obrigatórios!");
            return;
        }

        const produto = { nome, preco };
        this.setState({
            produtos: [...this.state.produtos, produto],
            nome: "",
            preco: ""
        });
    }

    render() {
        const { nome, preco, produtos } = this.state;
        let estiloBotao = `btn waves-effect waves-light ${this.props.tema}`;
        return (
            <div className="row">
                <form className="col s12" onSubmit={this.adicionarProduto}>
                    <div className="row">
                        <div className="input-field col s6">
                            <input
                                id="produto_nome"
                                name="nome"
                                type="text"
                                className="validate"
                                required
                                value={nome}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="produto_nome" className={nome ? "active" : ""}>
                                Nome do Produto/Serviço
                            </label>
                        </div>
                        <div className="input-field col s6">
                            <input
                                id="produto_preco"
                                name="preco"
                                type="text"
                                className="validate"
                                required
                                value={preco}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="produto_preco" className={preco ? "active" : ""}>
                                Preço
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <button className={estiloBotao} type="submit" name="action">
                                Registrar
                            </button>
                        </div>
                    </div>
                </form>

                {produtos.length > 0 && (
                    <div className="row">
                        <div className="col s12">
                            <h5>Produtos Cadastrados</h5>
                            <div style={{ border: "8px solid #ccc", padding: "10px" }}>
                                {produtos.map((produto, index) => (
                                    <div key={index}>
                                        <p>
                                            <strong>Nome:</strong> {produto.nome}
                                        </p>
                                        <p>
                                            <strong>Preço: R$</strong>{produto.preco}
                                        </p>
                                        {/* Renderiza o <hr> apenas se houver mais de um produto e não for o último item */}
                                        {index < produtos.length - 1 && <hr />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
