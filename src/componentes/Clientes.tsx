
import React, { useState } from "react";

type Props = {
    tema: string;
};

const FormularioCadastroCliente: React.FC<Props> = ({ tema }) => {
    const [clientes, setClientes] = useState<{ nome: string; sobrenome: string; telefone: string; email: string }[]>([]);
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === "nome" || name === "sobrenome") {
            newValue = value.replace(/[^a-zA-Z\s]/g, "");
        } else if (name === "telefone") {
            newValue = value.replace(/[^0-9]/g, "");
            if (newValue.length > 11) {
                newValue = newValue.slice(0, 11);
            }
            if (newValue.length > 0) {
                newValue = newValue
                    .replace(/^(\d{0,2})/, "($1")
                    .replace(/^(\(\d{2})(\d{0,5})/, "$1) $2")
                    .replace(/(\d{5})(\d{1,4})/, "$1-$2");
            }
        }
        if (name === "nome") setNome(newValue);
        if (name === "sobrenome") setSobrenome(newValue);
        if (name === "telefone") setTelefone(newValue);
        if (name === "email") setEmail(newValue);
    };

    const adicionarCliente = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!nome || !sobrenome || !telefone || !email) {
            alert("Todos os campos são obrigatórios!");
            return;
        }
        setClientes([...clientes, { nome, sobrenome, telefone, email }]);
        setNome("");
        setSobrenome("");
        setTelefone("");
        setEmail("");
    };

    const estiloBotao = `btn waves-effect waves-light ${tema}`;

    return (
        <div className="row">
            <form className="col s12" onSubmit={adicionarCliente}>
                <div className="row">
                    <div className="input-field col s6">
                        <input
                            id="nome"
                            name="nome"
                            type="text"
                            className="validate"
                            required
                            value={nome}
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
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

            {clientes.length > 0 && (
                <div className="row">
                    <div className="col s12">
                        <h5>Clientes Cadastrados</h5>
                        <div style={{ border: "8px solid #ccc", padding: "10px" }}>
                            {clientes.map((cliente, index) => (
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
                                    {index < clientes.length - 1 && <hr />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormularioCadastroCliente;
