
import React, { useState } from "react";

type Props = {
    tema: string;
};

const FormularioCadastroProduto: React.FC<Props> = ({ tema }) => {
    const [produtos, setProdutos] = useState<{ nome: string; preco: string }[]>([]);
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === "preco") {
            newValue = value.replace(/[^0-9]/g, "");
        }
        name === "nome" ? setNome(newValue) : setPreco(newValue);
    };

    const adicionarProduto = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!nome || !preco) {
            alert("Todos os campos são obrigatórios!");
            return;
        }

        setProdutos([...produtos, { nome, preco }]);
        setNome("");
        setPreco("");
    };

    const estiloBotao = `btn waves-effect waves-light ${tema}`;

    return (
        <div className="row">
            <form className="col s12" onSubmit={adicionarProduto}>
                <div className="row">
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
                    <div className="input-field col s6">
                        <input
                            id="produto_preco"
                            name="preco"
                            type="text"
                            className="validate"
                            required
                            value={preco}
                            onChange={handleInputChange}
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
                                        <strong>Preço: R$</strong> {produto.preco}
                                    </p>
                                    {index < produtos.length - 1 && <hr />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormularioCadastroProduto;
