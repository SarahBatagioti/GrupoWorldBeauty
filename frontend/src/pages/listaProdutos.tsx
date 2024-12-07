import React from "react";
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
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { SelectChangeEvent } from '@mui/material';

export interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
}

interface Props {
    produtos: Produto[];
    produtosConsumidosPorGenero: { genero: string; produtos: Produto[] }[];
}

const ListaProdutos: React.FC<Props> = ({ produtos, produtosConsumidosPorGenero }) => {
    const theme = useTheme();
    const [filterOption, setFilterOption] = useState('');
    const [editProduto, setEditProduto] = useState<Produto | null>(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [productList, setProductList] = useState<Produto[]>(produtos);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/produtos');
            const data = await response.json();
            setProductList(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    const handleFilterChange = (event: SelectChangeEvent<string>) => {
        setFilterOption(event.target.value);
    };

    const handleEditButtonClick = (produto: Produto) => {
        setEditProduto(produto);
        setOpenEditDialog(true);
    };

    const handleEditDialogClose = () => {
        setOpenEditDialog(false);
        setEditProduto(null);
    };

    const handleEditDialogSave = () => {
        if (editProduto) {
            handleEditProduto(editProduto.id, editProduto);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editProduto) {
            setEditProduto({ ...editProduto, [e.target.name]: e.target.value });
        }
    };

    const handleEditProduto = (id: number, updatedData: Produto) => {
        fetch(`http://localhost:5000/api/produtos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
            .then((response) => response.json())
            .then((data) => {
                setOpenEditDialog(false);
                setProductList((prevProducts) =>
                    prevProducts.map((produto) =>
                        produto.id === id ? data : produto
                    )
                );
            })
            .catch((error) => console.error('Error:', error));
    };

    const handleDeleteProduto = (id: number) => {
        fetch(`http://localhost:5000/api/produtos/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then(() => {
                setProductList((prevProducts) =>
                    prevProducts.filter((produto) => produto.id !== id)
                );
            })
            .catch((error) => console.error('Error:', error));
    };

    const filterProductsByGender = (gender: string): Produto[] => {
        const group = produtosConsumidosPorGenero.find(
            (item) => item.genero === gender
        );
        return group ? group.produtos : [];
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
                Lista de Produtos
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
                        {filterProductsByGender(gender).map((produto) => (
                            <div
                                key={produto.id}
                                style={{
                                    marginBottom: theme.spacing(2),
                                    padding: theme.spacing(2),
                                    border: `1px solid ${theme.palette.divider}`,
                                    borderRadius: theme.shape.borderRadius,
                                }}
                            >
                                <Typography variant="h6"><strong>Nome:</strong> {produto.nome}</Typography>
                                <Typography variant="subtitle1"><strong>Descrição:</strong> {produto.descricao}</Typography>
                                <Typography variant="subtitle1"><strong>Preço:</strong> {produto.preco}</Typography>
                                <div style={{ marginTop: theme.spacing(1) }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleEditButtonClick(produto)}
                                        style={{ marginRight: '8px' }}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDeleteProduto(produto.id)}
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
                    {editProduto && (
                        <div>
                            <TextField
                                margin="dense"
                                label="Nome"
                                type="text"
                                fullWidth
                                name="nome"
                                value={editProduto.nome}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="dense"
                                label="Descrição"
                                type="text"
                                fullWidth
                                name="descricao"
                                value={editProduto.descricao}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="dense"
                                label="Preço"
                                type="number"
                                fullWidth
                                name="preco"
                                value={editProduto.preco}
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

export default ListaProdutos;
