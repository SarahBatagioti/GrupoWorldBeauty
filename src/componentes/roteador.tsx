import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BarraNavegacao from "./barraNavegacao";
import FormularioCadastroCliente from "./Clientes";
import FormularioCadastroProduto from "./Produtos";
import FormularioCadastroConsumo from "./Consumos";

const Roteador: React.FC = () => {
    const botoes = [
        { nome: "Clientes", caminho: "/clientes" },
        { nome: "Produtos", caminho: "/produtos" },
        { nome: "Consumos", caminho: "/consumos" },
    ];

    return (
        <Router>
            <BarraNavegacao tema="blue" botoes={botoes} />
            <Routes>
                <Route path="/clientes" element={<FormularioCadastroCliente tema="blue" />} />
                <Route path="/produtos" element={<FormularioCadastroProduto tema="blue" />} />
                <Route path="/consumos" element={<FormularioCadastroConsumo tema="blue" />} />
            </Routes>
        </Router>
    );
};

export default Roteador;
