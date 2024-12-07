import express from 'express';
import bodyParser from 'body-parser';
import prisma from './prismaClient';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Fetch all clients with related products and services
app.get('/api/clientes', async (req, res) => {
    try {
        const clients = await prisma.cliente.findMany({
            include: {
                produtosConsumidos: {
                    include: {
                        produto: true
                    }
                },
                servicosConsumidos: {
                    include: {
                        servico: true
                    }
                }
            }
        });
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch clients' });
    }
});

// Create a new client
app.post('/api/clients', async (req, res) => {
    const { nome, sobrenome, telefone, email, genero, produtosConsumidos, servicosConsumidos } = req.body;

    try {
        const client = await prisma.cliente.create({
            data: {
                nome,
                sobrenome,
                telefone,
                email,
                genero,
                produtosConsumidos: {
                    create: produtosConsumidos.map((produto: { id: number }) => ({
                        produto: { connect: { id: produto.id } }
                    }))
                },
                servicosConsumidos: {
                    create: servicosConsumidos.map((servico: { id: number }) => ({
                        servico: { connect: { id: servico.id } }
                    }))
                }
            }
        });

        console.log('Created Client:', client);
        res.status(201).json(client);
    } catch (error) {
        console.error('Failed to add client:', error);
        res.status(500).json({ error: 'Failed to add client' });
    }
});

// Update a client
app.put('/api/clientes/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, sobrenome, telefone, email, genero, produtosConsumidos, servicosConsumidos } = req.body;
    
    console.log('Received data:', req.body); // Log the received data

    try {
        const client = await prisma.cliente.update({
            where: { id: parseInt(id) },
            data: {
                nome,
                sobrenome,
                telefone,
                email,
                genero,
                produtosConsumidos: {
                    deleteMany: {}, // Clear existing relations
                    create: produtosConsumidos.map((produto: { produtoId: number; }) => ({
                        produto: { connect: { id: produto.produtoId } }
                    }))
                },
                servicosConsumidos: {
                    deleteMany: {}, // Clear existing relations
                    create: servicosConsumidos.map((servico: { servicoId: number; }) => ({
                        servico: { connect: { id: servico.servicoId } }
                    }))
                }
            }
        });
        res.status(200).json(client);
    } catch (error) {
        console.error('Failed to update client:', error);
        res.status(500).json({ error: 'Failed to update client' });
    }
});


// Delete a client
app.delete('/api/clientes/:id', async (req, res) => {
	const { id } = req.params;
	try {
		await prisma.cliente.delete({
			where: { id: parseInt(id) }
		});
		res.status(200).json({ message: 'Client deleted' });
	} catch (error) {
		res.status(500).json({ error: 'Failed to delete client' });
	}
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
