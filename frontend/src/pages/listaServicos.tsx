import React, { useEffect, useState } from "react";
import {
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    List,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { SelectChangeEvent } from '@mui/material';

export interface Servico {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
}

interface Props {
    servicos: Servico[];
    servicosConsumidosPorGenero: { genero: string; servicos: Servico[] }[];
}

const ListaServicos: React.FC<Props> = ({ servicos, servicosConsumidosPorGenero }) => {
    const theme = useTheme();
    const [filterOption, setFilterOption] = useState('');
    const [editServico, setEditServico] = useState<Servico | null>(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [serviceList, setServiceList] = useState<Servico[]>(servicos);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/servicos');
            const data = await response.json();
            setServiceList(data);
        } catch (error) {
            console.error('Failed to fetch services:', error);
        }
    };

    const handleFilterChange = (event: SelectChangeEvent<string>) => {
        setFilterOption(event.target.value);
    };

    const handleEditButtonClick = (servico: Servico) => {
        setEditServico(servico);
        setOpenEditDialog(true);
    };

    const handleEditDialogClose = () => {
        setOpenEditDialog(false);
        setEditServico(null);
    };

    const handleEditDialogSave = () => {
        if (editServico) {
            handleEditServico(editServico.id, editServico);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editServico) {
            setEditServico({ ...editServico, [e.target.name]: e.target.value });
        }
    };

    const handleEditServico = (id: number, updatedData: Servico) => {
        fetch(`http://localhost:5000/api/servicos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
            .then((response) => response.json())
            .then((data) => {
                setOpenEditDialog(false);
                setServiceList((prevServices) =>
                    prevServices.map((servico) =>
                        servico.id === id ? data : servico
                    )
                );
            })
            .catch((error) => console.error('Error:', error));
    };

    const handleDeleteServico = (id: number) => {
        fetch(`http://localhost:5000/api/servicos/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then(() => {
                setServiceList((prevServices) =>
                    prevServices.filter((servico) => servico.id !== id)
                );
            })
            .catch((error) => console.error('Error:', error));
    };

    const filterServicesByGender = (gender: string): Servico[] => {
        const group = servicosConsumidosPorGenero.find(
            (item) => item.genero === gender
        );
        return group ? group.servicos : [];
    };

    const genders = ["Masculino", "Feminino"];

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
                Lista de Serviços
            </Typography>
            <FormControl
                variant="outlined"
                style={{
                    marginTop: theme.spacing(2),
                    marginLeft: theme.spacing(2),
                    marginRight: theme.spacing(2),
                    marginBottom: theme.spacing(2),
                    minWidth: 200,
                }}
            >
                <InputLabel id="filter-select-label">Filtrar</InputLabel>
                <Select
                    labelId="filter-select-label"
                    id="filter-select"
                    value={filterOption}
                    onChange={handleFilterChange}
                    label="Filtrar"
                >
                    <MenuItem value="">Todos</MenuItem>
                    <MenuItem value="mostConsumed">Mais Consumidos</MenuItem>
                    <MenuItem value="listarPorGenero">Por Gênero</MenuItem>
                </Select>
            </FormControl>
            {filterOption === 'listarPorGenero' &&
                genders.map((gender) => (
                    <div key={gender}>
                        <Typography
                            variant="h5"
                            style={{
                                marginLeft: theme.spacing(2),
                                marginTop: theme.spacing(2),
                                color: theme.palette.primary.main,
                            }}
                        >
                            {gender}
                        </Typography>
                        {filterServicesByGender(gender).map((servico) => (
                            <div
                                key={servico.id}
                                style={{
                                    marginBottom: theme.spacing(2),
                                    padding: theme.spacing(2),
                                    border: `1px solid ${theme.palette.divider}`,
                                    borderRadius: theme.shape.borderRadius,
                                }}
                            >
                                <Typography variant="h6">
                                    <strong>Nome:</strong> {servico.nome}
                                </Typography>
                                <Typography variant="subtitle1">
                                    <strong>Descrição:</strong> {servico.descricao}
                                </Typography>
                                <Typography variant="subtitle1">
                                    <strong>Preço:</strong> {servico.preco}
                                </Typography>
                                <div style={{ marginTop: theme.spacing(1) }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleEditButtonClick(servico)}
                                        style={{ marginRight: '8px' }}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDeleteServico(servico.id)}
                                    >
                                        Deletar
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
                <DialogContent>
                    {editServico && (
                        <div>
                            <TextField
                                margin="dense"
                                label="Nome"
                                type="text"
                                fullWidth
                                name="nome"
                                value={editServico.nome}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="dense"
                                label="Descrição"
                                type="text"
                                fullWidth
                                name="descricao"
                                value={editServico.descricao}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="dense"
                                label="Preço"
                                type="number"
                                fullWidth
                                name="preco"
                                value={editServico.preco}
                                onChange={handleInputChange}
                            />
                        </div>
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
};

export default ListaServicos;
