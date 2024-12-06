import React, { Component } from "react";

type props = {
    tema: string;
};

type state = {
    clientes: { nome: string; sobrenome: string; telefone: string; email: string }[];
    nome: string;
    sobrenome: string;
    telefone: string;
    email: string;
};

export default class FormularioCadastroCliente extends Component<props, state> {
    constructor(props: props) {
        super(props);
        this.state = {
            clientes: [],
            nome: "",
            sobrenome: "",
            telefone: "",
            email: ""
        };
        this.adicionarCliente = this.adicionarCliente.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        // Validação específica para cada campo
        let newValue = value;
        if (name === "nome" || name === "sobrenome") {
            newValue = value.replace(/[^a-zA-Z\s]/g, ""); // Permite apenas letras e espaços
        } else if (name === "telefone") {
            newValue = value.replace(/[^0-9]/g, ""); // Permite apenas números
            if (newValue.length > 11) {
                newValue = newValue.slice(0, 11); // Limita a 11 dígitos
            }

            // Aplica a máscara dinamicamente
            if (newValue.length > 0) {
                newValue = newValue
                    .replace(/^(\d{0,2})/, "($1")
                    .replace(/^(\(\d{2})(\d{0,5})/, "$1) $2")
                    .replace(/(\d{5})(\d{1,4})/, "$1-$2");
            }
        }

        this.setState({ [name]: newValue } as unknown as Pick<state, keyof state>);
    }

    adicionarCliente(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { nome, sobrenome, telefone, email } = this.state;

        const cliente = { nome, sobrenome, telefone, email };
        this.setState({
            clientes: [...this.state.clientes, cliente],
            nome: "",
            sobrenome: "",
            telefone: "",
            email: ""
        });
    }

    render() {
        const { nome, sobrenome, telefone, email } = this.state;
        let estiloBotao = `btn waves-effect waves-light ${this.props.tema}`;
        return (
            <div className="row">
                <form className="col s12" onSubmit={this.adicionarCliente}>
                    <div className="row">
                        <div className="input-field col s6">
                            <input
                                id="nome"
                                name="nome"
                                type="text"
                                className="validate"
                                required
                                value={nome}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="nome" className={nome ? "active" : ""}>
                                Nome
                            </label>
                        </div>
                        <div className="input-field col s6">
                            <input
                                id="sobrenome"
                                name="sobrenome"
                                type="text"
                                className="validate"
                                required
                                value={sobrenome}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="sobrenome" className={sobrenome ? "active" : ""}>
                                Sobrenome
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input
                                id="telefone"
                                name="telefone"
                                type="text"
                                className="validate"
                                required
                                value={telefone}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="telefone" className={telefone ? "active" : ""}>
                                Telefone
                            </label>
                        </div>
                        <div className="input-field col s6">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="validate"
                                required
                                value={email}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="email" className={email ? "active" : ""}>
                                E-mail
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

                {this.state.clientes.length > 0 && (
                    <div className="row">
                        <div className="col s12">
                            <h5>Clientes Cadastrados</h5>
                            <div style={{ border: "8px solid #ccc", padding: "10px" }}>
                                {this.state.clientes.map((cliente, index) => (
                                    <div key={index}>
                                        <p>
                                            <strong>Nome:</strong> {cliente.nome} {cliente.sobrenome}
                                        </p>
                                        <p>
                                            <strong>Telefone:</strong> {cliente.telefone}
                                        </p>
                                        <p>
                                            <strong>E-mail:</strong> {cliente.email}
                                        </p>
                                        {index < this.state.clientes.length - 1 && <hr />}
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
