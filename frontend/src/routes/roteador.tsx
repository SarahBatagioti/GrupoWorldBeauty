import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import BarraNavegacao from "../componentes/barraNavegacao";
import FormularioCadastroCliente from "../componentes/formularioCadastroCliente";
import ListaCliente from "../pages/listaCliente";

type Cliente = {
    id: number;
    nome: string;
    sobrenome: string;
    telefone: string;
    email: string;
    genero: string;
};

type Botao = {
    nome: string;
    link?: string;
    dropdown?: Botao[];
};

type Props = {};

const theme = createTheme({
    palette: {
        primary: {
            main: '#873e23',
        },
        secondary: {
            main: '#eab676',
        },
        text: {
            primary: '#515151'
        }
    },
    typography: {
        fontFamily: 'Space Grotesk, sans-serif',
        h2: {
            fontSize: '2rem',
            fontWeight: 'bold',
        },
    },
});

export default function Roteador(props: Props) {
    const [clientes, setClientes] = useState<Cliente[]>([]);

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/clientes');
            const data = await response.json();
            setClientes(data || []);
        } catch (error) {
            console.error('Failed to fetch clients:', error);
            setClientes([]);
        }
    };


    const handleCadastroCliente = (cliente: Cliente) => {
        setClientes([...clientes, cliente]);
    };

    const handleUpdateClient = (updatedClient: Cliente) => {
        setClientes(prevClientes =>
            prevClientes.map(cliente =>
                cliente.id === updatedClient.id ? updatedClient : cliente
            )
        );
    };


    const botoes: Botao[] = [
        { nome: 'Cadastro Cliente', link: '/cadastros/cliente' },
        { nome: 'Clientes', link: '/clientes' }
    ];


    return (
        <ThemeProvider theme={theme}>
            <Router>
                <BarraNavegacao
                    seletorView={(valor: string) => console.log('View selecionada:', valor)}
                    tema="purple lighten-4"
                    botoes={botoes}
                />
                <Routes>
                    <Route path="/" element={<Navigate to="/clientes" />} />
                    <Route path="/clientes" element={<ListaCliente
                        clientes={clientes}
                        onUpdateClient={handleUpdateClient}
                    />} />
                    <Route path="/cadastros/cliente" element={<FormularioCadastroCliente
                        tema="purple lighten-4"
                        onCadastroCliente={handleCadastroCliente} />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}
