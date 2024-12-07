import React, { useState } from "react";
import {
    TextField,
    Button,
    Grid,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { SelectChangeEvent } from '@mui/material';
import axios from "axios";

interface Cliente {
    id: number;
    nome: string;
    sobrenome: string;
    telefone: string;
    email: string;
    genero: string;
}

interface Props {
    tema: string;
    onCadastroCliente: (cliente: Cliente) => void;
}

export default function FormularioCadastroCliente(props: Props) {
    const { tema, onCadastroCliente } = props;
    const [formData, setFormData] = useState<Cliente>({
        id: 0,
        nome: "",
        sobrenome: "",
        telefone: "",
        email: "",
        genero: "",
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === "telefone") {
            const cleanedValue = value.replace(/\D/g, '');
            if (cleanedValue.length === 11) {
                const formattedValue = `(${cleanedValue.slice(0, 2)}) ${cleanedValue.slice(2, 7)}-${cleanedValue.slice(7)}`;
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: formattedValue,
                }));
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: cleanedValue,
                }));
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const value = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            genero: value,
        }));
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log('Form data before submission:', formData);

        try {
            const response = await axios.post('http://localhost:5000/api/clients', formData);
            onCadastroCliente(response.data);
            setFormData({
                id: 0,
                nome: "",
                sobrenome: "",
                telefone: "",
                email: "",
                genero: "",
            });
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <form onSubmit={handleFormSubmit}>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={8} sm={3}>
                            <TextField
                                fullWidth
                                id="first_name"
                                label="Nome"
                                variant="outlined"
                                name="nome"
                                value={formData.nome}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={8} sm={3}>
                            <TextField
                                fullWidth
                                id="last_name"
                                label="Sobrenome"
                                variant="outlined"
                                name="sobrenome"
                                value={formData.sobrenome}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={8} sm={3}>
                            <TextField
                                fullWidth
                                id="telefone"
                                label="Telefone"
                                variant="outlined"
                                name="telefone"
                                value={formData.telefone}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={8} sm={3}>
                            <TextField
                                fullWidth
                                id="email"
                                label="E-mail"
                                variant="outlined"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid xs={8} sm={3}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="genero-label">Gênero</InputLabel>
                                <Select
                                    labelId="genero-label"
                                    id="genero"
                                    value={formData.genero}
                                    onChange={handleSelectChange}
                                    label="Gênero"
                                    required
                                >
                                    <MenuItem value="">Selecione</MenuItem>
                                    <MenuItem value="Feminino">Feminino</MenuItem>
                                    <MenuItem value="Masculino">Masculino</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid xs={8} sm={3}>
                            <Button
                                variant="contained"
                                type="submit"
                                className={tema}
                                fullWidth={isMobile}
                            >
                                Cadastrar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
}
