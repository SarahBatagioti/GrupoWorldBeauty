import promptSync from "prompt-sync";


export default class Entrada {
    public receberNumero(mensagem: string): number {
        let prompt = promptSync();
        let valor = prompt(mensagem)
        let numero  = new Number(valor)
        return numero ? parseFloat(valor) : 0; // Retorna o número convertido ou 0 se a entrada for inválida
    }

    public receberTexto(mensagem: string): string {
        let prompt = promptSync();
        let texto = prompt(mensagem)
        return texto ? texto : ""; // Retorna o texto ou uma string vazia se a entrada for inválida
    }
}
