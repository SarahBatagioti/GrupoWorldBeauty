import Produto from "../../modelo/produtos";

export default function cadastroProdutos() {
    let produtos: Produto[] = [];

    // Produtos femininos
    const produto1 = new Produto("Manicure", 40.00);
    const produto2 = new Produto("Pedicure", 50.00);
    const produto3 = new Produto("Design de sobrancelhas", 35.00);
    const produto4 = new Produto("Corte e pintura de cabelo", 120.00);
    const produto5 = new Produto("Remoção de rugas", 200.00);
    const produto6 = new Produto("Remoção de manchas na pele", 180.00);
    const produto7 = new Produto("Aplicação de Botox", 250.00);
    const produto8 = new Produto("Tratamento para emagrecimento", 300.00);
    const produto9 = new Produto("Redução de medidas", 270.00);
    const produto10 = new Produto("Pack produtos skin care", 390.00);

    // Produtos masculinos
    
    const produto11 = new Produto("Modelagem e corte de barba", 70.00);
    const produto12 = new Produto("Tratamento para quedas de cabelo", 150.00);
    const produto13 = new Produto("Creme pós-barba", 25.00);
    const produto14 = new Produto("Gel para cabelo", 20.00);
    const produto15 = new Produto("Shampoo antiqueda", 30.00);
    const produto16 = new Produto("Pomada modeladora", 35.00);
    const produto17 = new Produto("Condicionador fortificante", 28.00);
    const produto18 = new Produto("Corte de cabelo", 60.00);
    const produto19 = new Produto("Óleo para barba", 22.00);
    const produto20 = new Produto("Hidratante para pele ressecada", 60.00);

    produtos.push(
        produto1, produto2, produto3, produto4, produto5, produto6, produto7, produto8, produto9, produto10,
        produto11, produto12, produto13, produto14, produto15, produto16, produto17, produto18, produto19, produto20
    );

    return produtos;
}


