import React, { useEffect, useState } from "react";
import {
    Typography,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';

type Cliente = {
    id: number;
    nome: string;
    sobrenome: string;
    telefone: string;
    email: string;
    genero: string;
};

interface Props {
    clientes: Cliente[];
    onUpdateClient: (updatedClient: Cliente) => void;
}

export default function ListaCliente(props: Props) {
    const { clientes, onUpdateClient } = props;
    const theme = useTheme();
    const [editClient, setEditClient] = useState<Cliente | null>(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [clientList, setClientList] = useState<Cliente[]>(clientes);

    useEffect(() => {
        setClientList(clientes); // Atualiza a lista de clientes ao receber novos dados
    }, [clientes]);

    const handleEditButtonClick = (client: Cliente) => {
        setEditClient(client);
        setOpenEditDialog(true);
    };

    const handleEditDialogClose = () => {
        setOpenEditDialog(false);
        setEditClient(null);
    };

    const handleEditDialogSave = () => {
        if (editClient) {
            handleEditClient(editClient.id, editClient);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editClient) {
            setEditClient({ ...editClient, [e.target.name]: e.target.value });
        }
    };

    const handleSelectChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { name, value } = event.target;
        if (editClient && name) {
            setEditClient({ ...editClient, [name]: value as string });
        }
    };

    const handleEditClient = (id: number, updatedData: Cliente) => {
        fetch(`http://localhost:5000/api/clientes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to update client');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Client updated:', data);

                setClientList((prevClients) =>
                    prevClients.map((cliente) => (cliente.id === id ? data : cliente))
                );

                onUpdateClient(data); // Atualiza o componente pai
                setOpenEditDialog(false);
                setEditClient(null); // Limpa o estado de edição
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleDeleteClient = (id: number) => {
        fetch(`http://localhost:5000/api/clientes/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then(() => {
                setClientList((prevClients) =>
                    prevClients.filter((cliente) => cliente.id !== id)
                );
            })
            .catch((error) => console.error('Error:', error));
    };

    return (
        <div style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}>
            <Typography
                variant="h2"
                style={{
                    fontFamily: theme.typography.fontFamily,
                    marginLeft: theme.spacing(2),
                    marginRight: theme.spacing(2),
                    color: '#515151',
                }}
            >
                Lista de Clientes
            </Typography>
            {clientList.length === 0 ? (
                <Typography
                    variant="h5"
                    style={{
                        textAlign: 'center',
                        marginTop: theme.spacing(4),
                        color: theme.palette.text.secondary,
                    }}
                >
                    Nenhum cliente cadastrado
                </Typography>
            ) : (
                clientList.map((client, index) => (
                    <div
                        key={client.id}
                        style={{
                            marginBottom: theme.spacing(2),
                            padding: theme.spacing(2),
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: theme.shape.borderRadius,
                        }}
                    >
                        <Typography variant="subtitle1">
                            <strong>Nome:</strong> {client.nome}
                        </Typography>
                        <Typography variant="subtitle1">
                            <strong>Sobrenome:</strong> {client.sobrenome}
                        </Typography>
                        <Typography variant="subtitle1">
                            <strong>Telefone:</strong> {client.telefone}
                        </Typography>
                        <Typography variant="subtitle1">
                            <strong>Email:</strong> {client.email}
                        </Typography>
                        <Typography variant="subtitle1">
                            <strong>Gênero:</strong> {client.genero}
                        </Typography>
                        <div style={{ marginTop: theme.spacing(1) }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleEditButtonClick(client)}
                                style={{ marginRight: '8px' }}
                            >
                                Editar
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleDeleteClient(client.id)}
                            >
                                Excluir
                            </Button>
                        </div>
                    </div>
                ))
            )}
            <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
                <DialogContent>
                    {editClient && (
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="dense"
                                    label="Nome"
                                    type="text"
                                    fullWidth
                                    name="nome"
                                    value={editClient.nome}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="dense"
                                    label="Sobrenome"
                                    type="text"
                                    fullWidth
                                    name="sobrenome"
                                    value={editClient.sobrenome}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="dense"
                                    label="Telefone"
                                    type="text"
                                    fullWidth
                                    name="telefone"
                                    value={editClient.telefone}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="dense"
                                    label="E-mail"
                                    type="email"
                                    fullWidth
                                    name="email"
                                    value={editClient.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth margin="dense">
                                    <InputLabel id="genero-label">Gênero</InputLabel>
                                    <Select
                                        labelId="genero-label"
                                        id="genero"
                                        name="genero"
                                        value={editClient.genero}
                                    >
                                        <MenuItem value="Masculino">Masculino</MenuItem>
                                        <MenuItem value="Feminino">Feminino</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditDialogSave} color="primary">
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
