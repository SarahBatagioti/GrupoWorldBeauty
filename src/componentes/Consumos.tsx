import React, { Component } from "react";

type props = {
    tema: string;
};

type state = {
    consumos: { email: string; nome: string; quantidade: string; dataConsumo: string }[];
    email: string;
    nome: string;
    quantidade: string;
    dataConsumo: string;
};

export default class Consumos extends Component<props, state> {
    constructor(props: props) {
        super(props);
        this.state = {
            consumos: [],
            email: "",
            nome: "",
            quantidade: "",
            dataConsumo: ""
        };
        this.adicionarConsumo = this.adicionarConsumo.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        let newValue = value;
        if (name === "quantidade") {
            newValue = value.replace(/[^0-9]/g, ""); // Permite apenas números
        } else if (name === "dataConsumo") {
            newValue = value.replace(/[^0-9]/g, ""); // Permite apenas números
            // Aplica máscara de data dd/mm/aaaa
            if (newValue.length > 0) {
                newValue = newValue
                    .replace(/^(\d{2})(\d{0,2})/, "$1/$2")
                    .replace(/(\d{2}\/\d{2})(\d{0,4})/, "$1/$2");
            }
            // Limita o tamanho a 10 caracteres
            if (newValue.length > 10) {
                newValue = newValue.slice(0, 10);
            }
        }

        this.setState({ [name]: newValue } as unknown as Pick<state, keyof state>);
    }

    adicionarConsumo(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const { email, nome, quantidade, dataConsumo } = this.state;

        if (!email || !nome || !quantidade || !dataConsumo) {
            alert("Todos os campos são obrigatórios!");
            return;
        }

        const consumo = { email, nome, quantidade, dataConsumo };
        this.setState({
            consumos: [...this.state.consumos, consumo],
            email: "",
            nome: "",
            quantidade: "",
            dataConsumo: ""
        });
    }

    render() {
        const { email, nome, quantidade, dataConsumo, consumos } = this.state;
        let estiloBotao = `btn waves-effect waves-light ${this.props.tema}`;
        return (
            <div className="row">
                <form className="col s12" onSubmit={this.adicionarConsumo}>
                    <div className="row">
                        <div className="input-field col s6">
                            <input
                                id="cliente_email"
                                name="email"
                                type="email"
                                className="validate"
                                required
                                value={email}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="cliente_email" className={email ? "active" : ""}>
                                E-mail do Cliente
                            </label>
                        </div>
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
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input
                                id="quantidade"
                                name="quantidade"
                                type="text"
                                className="validate"
                                required
                                value={quantidade}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="quantidade" className={quantidade ? "active" : ""}>
                                Quantidade
                            </label>
                        </div>
                        <div className="input-field col s6">
                            <input
                                id="data_consumo"
                                name="dataConsumo"
                                type="text"
                                className="validate"
                                required
                                value={dataConsumo}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="data_consumo" className={dataConsumo ? "active" : ""}>
                                Data de Consumo
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

                {consumos.length > 0 && (
                    <div className="row">
                        <div className="col s12">
                            <h5>Consumos Registrados</h5>
                            <div style={{ border: "8px solid #ccc", padding: "10px" }}>
                                {consumos.map((consumo, index) => (
                                    <div key={index}>
                                        <p>
                                            <strong>E-mail do Cliente:</strong> {consumo.email}
                                        </p>
                                        <p>
                                            <strong>Produto/Serviço:</strong> {consumo.nome}
                                        </p>
                                        <p>
                                            <strong>Quantidade:</strong> {consumo.quantidade}
                                        </p>
                                        <p>
                                            <strong>Data de Consumo:</strong> {consumo.dataConsumo}
                                        </p>
                                        {/* Renderiza o <hr> apenas se houver mais de um consumo e não for o último item */}
                                        {index < consumos.length - 1 && <hr />}
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
