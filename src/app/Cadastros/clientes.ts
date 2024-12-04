import Cliente from "../../modelo/cliente";
import CPF from "../../modelo/cpf";
import insertProdutos from "./produtos";

export default function cadastroClientes() {
    let clientes: Cliente[] = [];
    let produto = insertProdutos();

    let cliente1 = new Cliente("Chandler Bing", "Chandler", new CPF("12345678901", new Date(1969, 4, 24)), "M");
    cliente1.adicionarProduto(produto[15]);
    cliente1.adicionarQuantidadeProduto(2);

    let cliente2 = new Cliente("Jake Peralta", "Jake", new CPF("23456789012", new Date(1981, 6, 20)), "M",);
    cliente2.adicionarProduto(produto[16]);
    cliente2.adicionarQuantidadeProduto(1);
    cliente2.adicionarProduto(produto[20]);
    cliente2.adicionarQuantidadeProduto(3);
    cliente2.adicionarProduto(produto[17]);
    cliente2.adicionarQuantidadeProduto(2)

    let cliente3 = new Cliente("Logan Huntzberger", "Logan", new CPF("34567890123", new Date(1982, 1, 14)), "M");
    cliente3.adicionarProduto(produto[19]);
    cliente3.adicionarQuantidadeProduto(2);

    let cliente4 = new Cliente("Michael Scofield", "Michael", new CPF("45678901234", new Date(1978, 10, 8)), "M");
    cliente4.adicionarProduto(produto[12]);
    cliente4.adicionarQuantidadeProduto(1);

    let cliente5 = new Cliente("Newt Scamander", "Newt", new CPF("56789012345", new Date(1897, 2, 24)), "M");
    cliente5.adicionarProduto(produto[13]);
    cliente5.adicionarQuantidadeProduto(1);

    let cliente6 = new Cliente("Harry Potter", "Harry", new CPF("67890123456", new Date(1980, 7, 31)), "M");
    cliente6.adicionarProduto(produto[17]);
    cliente6.adicionarQuantidadeProduto(1);

    let cliente7 = new Cliente("Dipper Pines", "Dipper", new CPF("78901234567", new Date(1999, 8, 31)), "M");
    cliente7.adicionarProduto(produto[18]);
    cliente7.adicionarQuantidadeProduto(2);

    let cliente8 = new Cliente("Ron Weasley", "Ron", new CPF("89012345678", new Date(1980, 3, 1)), "M");
    cliente8.adicionarProduto(produto[0]);
    cliente8.adicionarQuantidadeProduto(3);

    let cliente9 = new Cliente("Lucas Sinclair", "Lucas", new CPF("90123456789", new Date(2003, 11, 14)), "M");
    cliente9.adicionarProduto(produto[14]);

    let cliente10 = new Cliente("Stanford Pines", "Stan", new CPF("11223344556", new Date(1942, 5, 15)), "M");
    cliente10.adicionarProduto(produto[15]);
    cliente10.adicionarQuantidadeProduto(1);

    let cliente11 = new Cliente("Monica Geller", "Monica", new CPF("22334455667", new Date(1969, 3, 22)), "F");
    cliente11.adicionarProduto(produto[1]);
    cliente11.adicionarQuantidadeProduto(2);

    let cliente12 = new Cliente("Rachel Green", "Rachel", new CPF("33445566778", new Date(1969, 5, 5)), "F");
    cliente12.adicionarProduto(produto[2]);
    cliente12.adicionarQuantidadeProduto(2);
    cliente12.adicionarProduto(produto[1]);
    cliente12.adicionarQuantidadeProduto(1)
    cliente12.adicionarProduto(produto[3])
    cliente12.adicionarQuantidadeProduto(2)

    let cliente13 = new Cliente("Lorelai Gilmore", "Lorelai", new CPF("44556677889", new Date(1968, 4, 25)), "F");
    cliente13.adicionarProduto(produto[3]);
    cliente13.adicionarQuantidadeProduto(1);

    let cliente14 = new Cliente("Clary Fray", "Clary", new CPF("55667788990", new Date(1991, 8, 23)), "F");
    cliente14.adicionarProduto(produto[4]);
    cliente14.adicionarQuantidadeProduto(1);

    let cliente15 = new Cliente("Luna Lovegood", "Luna", new CPF("66778899001", new Date(1981, 2, 13)), "F");
    cliente15.adicionarProduto(produto[5]);
    cliente15.adicionarQuantidadeProduto(1);

    let cliente16 = new Cliente("Ginny Weasley", "Ginny", new CPF("77889900112", new Date(1981, 8, 11)), "F");
    cliente16.adicionarProduto(produto[6]);
    cliente16.adicionarQuantidadeProduto(1);

    let cliente17 = new Cliente("Wendy Corduroy", "Wendy", new CPF("88990011223", new Date(1996, 9, 7)), "F");
    cliente17.adicionarProduto(produto[7]);
    cliente17.adicionarQuantidadeProduto(2);

    let cliente18 = new Cliente("Rory Gilmore", "Rory", new CPF("99001122334", new Date(1984, 10, 8)), "F");
    cliente18.adicionarProduto(produto[9]);
    cliente18.adicionarQuantidadeProduto(1);

    let cliente19 = new Cliente("Alex Dunphy", "Alex", new CPF("01122334455", new Date(1996, 1, 14)), "F");
    cliente19.adicionarProduto(produto[10]);
    cliente19.adicionarQuantidadeProduto(2);

    let cliente20 = new Cliente("Robin Buckley", "Robin", new CPF("12233445566", new Date(2000, 12, 12)), "F");
    cliente20.adicionarProduto(produto[11]);
    cliente20.adicionarQuantidadeProduto(1);

    let cliente21 = new Cliente("Star Butterfly", "Star", new CPF("23344556677", new Date(2000, 1, 18)), "F");
    cliente21.adicionarProduto(produto[20]);
    cliente21.adicionarQuantidadeProduto(1);

    let cliente22 = new Cliente("Jordan Baker", "Jordan", new CPF("34455667788", new Date(1999, 3, 14)), "M");
    cliente22.adicionarProduto(produto[21]); 
    cliente22.adicionarQuantidadeProduto(2);

    let cliente23 = new Cliente("Dash", "Dash", new CPF("45566778899", new Date(2001, 11, 8)), "M");
    cliente23.adicionarProduto(produto[8]); 
    cliente23.adicionarQuantidadeProduto(1);

    let cliente24 = new Cliente("Lily", "Lily", new CPF("56677889900", new Date(2000, 6, 3)), "F");
    cliente24.adicionarProduto(produto[19]); 
    cliente24.adicionarQuantidadeProduto(1);

    let cliente25 = new Cliente("Natasha Romanoff", "Natasha", new CPF("67788990011", new Date(1984, 11, 22)), "F");
    cliente25.adicionarProduto(produto[1]); 
    cliente25.adicionarQuantidadeProduto(2);

    let cliente26 = new Cliente("Tony Stark", "Tony", new CPF("78899001122", new Date(1970, 5, 29)), "M");
    cliente26.adicionarProduto(produto[15]); 
    cliente26.adicionarQuantidadeProduto(1);

    let cliente27 = new Cliente("Wanda Maximoff", "Wanda", new CPF("89900112233", new Date(1989, 2, 10)), "F");
    cliente27.adicionarProduto(produto[3]); 
    cliente27.adicionarQuantidadeProduto(1);

    let cliente28 = new Cliente("Steve Rogers", "Steve", new CPF("90011223344", new Date(1918, 7, 4)), "M");
    cliente28.adicionarProduto(produto[16]); 
    cliente28.adicionarQuantidadeProduto(1);

    let cliente29 = new Cliente("Carol Danvers", "Carol", new CPF("01122334466", new Date(1968, 10, 17)), "F");
    cliente29.adicionarProduto(produto[6]);
    cliente29.adicionarQuantidadeProduto(1);

    let cliente30 = new Cliente("Thor Odinson", "Thor", new CPF("12233445577", new Date(965, 1, 1)), "M");
    cliente30.adicionarProduto(produto[18]);
    cliente30.adicionarQuantidadeProduto(2);

    clientes.push(
        cliente1, cliente2, cliente3, cliente4, cliente5, cliente6, cliente7, cliente8, cliente9, cliente10,
        cliente11, cliente12, cliente13, cliente14, cliente15, cliente16, cliente17, cliente18, cliente19, cliente20,
        cliente21, cliente22, cliente23, cliente24, cliente25, cliente26, cliente27, cliente28, cliente29, cliente30,
    );

    return clientes;
}
