export default class Entrada {
    public receberNumero(mensagem: string): number {
        const numero = prompt(mensagem); // Usa prompt para receber a entrada do usuário
        return numero ? parseFloat(numero) : 0; // Retorna o número convertido ou 0 se a entrada for inválida
    }

    public receberTexto(mensagem: string): string {
        const texto = prompt(mensagem); // Usa prompt para receber a entrada do usuário
        return texto ? texto : ""; // Retorna o texto ou uma string vazia se a entrada for inválida
    }
}
