
import React, { useState } from "react";

type Props = {
    tema: string;
};

const FormularioCadastroConsumo: React.FC<Props> = ({ tema }) => {
    const [consumos, setConsumos] = useState<{ email: string; nome: string; quantidade: string; dataConsumo: string }[]>([]);
    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [dataConsumo, setDataConsumo] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === "quantidade") {
            newValue = value.replace(/[^0-9]/g, "");
        } else if (name === "dataConsumo") {
            newValue = value
                .replace(/[^0-9\/]/g, "")
                .replace(/^(\d{2})(\d{0,2})/, "$1/$2")
                .replace(/(\d{2}\/\d{2})(\d{0,4})/, "$1/$2");
            if (newValue.length > 10) {
                newValue = newValue.slice(0, 10);
            }
        }
        if (name === "email") setEmail(newValue);
        if (name === "nome") setNome(newValue);
        if (name === "quantidade") setQuantidade(newValue);
        if (name === "dataConsumo") setDataConsumo(newValue);
    };

    const adicionarConsumo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email || !nome || !quantidade || !dataConsumo) {
            alert("Todos os campos são obrigatórios!");
            return;
        }

        setConsumos([...consumos, { email, nome, quantidade, dataConsumo }]);
        setEmail("");
        setNome("");
        setQuantidade("");
        setDataConsumo("");
    };

    const estiloBotao = `btn waves-effect waves-light ${tema}`;

    return (
        <div className="row">
            <form className="col s12" onSubmit={adicionarConsumo}>
                <div className="row">
                    <div className="input-field col s6">
                        <input
                            id="cliente_email"
                            name="email"
                            type="email"
                            className="validate"
                            required
                            value={email}
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
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
                                    {index < consumos.length - 1 && <hr />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormularioCadastroConsumo;
