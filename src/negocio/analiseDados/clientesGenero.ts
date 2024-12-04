import Cliente from "../../modelo/cliente";
import Listagem from "../listagem";

export default class ClientesGenero extends Listagem {
  private clientes: Array<Cliente>;

  constructor(clientes: Array<Cliente>) {
    super();
    this.clientes = clientes;
  }

  public listar(): void {
    console.log("\nClientes por Gênero:");
    const clientesPorGenero = this.clientes.reduce((acc, cliente) => {
      const genero = cliente.getGenero;
      if (!acc[genero]) acc[genero] = [];
      acc[genero].push(cliente.nome);
      return acc;
    }, {} as Record<string, string[]>);

    Object.entries(clientesPorGenero).forEach(([genero, clientes]) => {
      console.log(`\nGênero: ${genero}`);
      clientes.forEach(cliente => console.log(`- ${cliente}`));
    });
  }
}
