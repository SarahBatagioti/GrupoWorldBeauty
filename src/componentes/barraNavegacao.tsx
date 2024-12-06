/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";
import { Link } from "react-router-dom";

type Props = {
    tema: string;
    botoes: { nome: string; caminho: string }[]; // Adicionado caminho para roteamento
};

const BarraNavegacao: React.FC<Props> = ({ tema, botoes }) => {
    useEffect(() => {
        const elems = document.querySelectorAll(".sidenav");
        M.Sidenav.init(elems);
    }, []);

    const gerarListaBotoes = () => {
        if (botoes.length <= 0) return <></>;
        return botoes.map(({ nome, caminho }) => (
            <li key={nome}>
                <Link to={caminho}>{nome}</Link>
            </li>
        ));
    };

    const estilo = `${tema}`;

    return (
        <>
            <nav className={estilo}>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo">
                        WB
                    </Link>
                    <a data-target="mobile-menu" className="sidenav-trigger">
                        <i className="material-icons">menu</i>
                    </a>
                    <ul className="right hide-on-med-and-down">{gerarListaBotoes()}</ul>
                </div>
            </nav>
            <ul className="sidenav" id="mobile-menu">
                {gerarListaBotoes()}
            </ul>
        </>
    );
};

export default BarraNavegacao;
