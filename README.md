# Como foi feito o projeto?

Este guia descreve os passos a passo e explicação de cada item importante para a elaboração da tarefa

# Iniciando o Projeto

Passos iniciais para configurar um projeto Node.js com TypeScript.

## Passos para Configuração

1. **Criar o arquivo `package.json`**

   Para iniciar o projeto, você precisa criar um arquivo `package.json`, que gerencia as dependências e configurações do seu projeto. O comando a seguir inicia o assistente de configuração do NPM, onde você pode definir o nome do projeto, versão, descrição e outras informações.

   ```bash
   npm init
   ```

   - **Nota:** Durante a execução deste comando, fique atento ao "entry point", que é o arquivo principal do seu projeto. O padrão é `index.js`, mas você pode mudá-lo se preferir.

2. **Criar o arquivo de configuração TypeScript (`tsconfig.json`)**

   Para adicionar suporte ao TypeScript, é necessário criar um arquivo de configuração chamado `tsconfig.json`. Este arquivo contém várias opções que controlam como o TypeScript deve compilar seu código.

   Execute o seguinte comando:

   ```bash
   npx tsc --init
   ```

   - Este comando cria um arquivo `tsconfig.json` com as configurações padrão. Você pode editar este arquivo para ajustar as configurações de compilação conforme necessário para o seu projeto.

3. **Configuração do arquivo tsconfig.json**

    O arquivo tem a configuração passada em sala de aula

    ```json
    {
        "compilerOptions": {
            "target": "ES5", /* Versão do JavaScript você quer que seu código seja transformado */
            "module": "CommonJS", /* Define como você organiza seu código em partes menores, chamadas de módulos */
            "strict": true, /* Habilita todas as opções de verificação rigorosa do TypeScript, ajudando a identificar potenciais erros. */
            "esModuleInterop": true, /* Permite a importação de módulos ES6 para módulos CommonJS, facilitando a interoperabilidade. */
            "skipLibCheck": true, /* Ignora a verificação de tipos em arquivos de definição de tipo (.d.ts), acelerando o processo de compilação. */
            "forceConsistentCasingInFileNames": true, /* Garante que o casing (maiúsculas/minúsculas) dos nomes de arquivos seja consistente, prevenindo erros em sistemas de arquivos sensíveis a case. */
            "outDir": "out/", /* Diretório onde os arquivos compilados serão colocados, sepando os arquivos ts de js. */
            "moduleResolution": "node", /* Define o método de resolução de módulos */
            "noImplicitAny": false /* Permite o uso de 'any' implícito. Se definido como true, o TypeScript exigirá que você especifique o tipo ou coloque 'any'. */
        },
        "include": [
            "src/**/*" /* Inclui todos os arquivos e subdiretórios dentro da pasta 'src' para serem compilados. */
        ]
    }

    ```

4. **Estruturação de pastas**

    ```bash
    .
    ├── docs/                # Arquivo com especificações da tarefa
    ├── out/                 # Diretório de arquivos compilados (.js)
    ├── src/                 # Diretório principal do código fonte
    │   ├── app/             # Contém o arquivo index.js, que é o ponto de entrada da aplicação
    │   ├── io/              # Responsável por interações de entrada/saída, como manipulação de arquivos ou entradas
    │   ├── modelo/          # Contém definições de modelos de dados, representando entidades do sistema
    │   └── negocio/         # Contém a lógica de negócio da aplicação, onde as regras e operações principais são implementadas
    ├── package.json         # Arquivo de configuração que lista as dependências do projeto e scripts de execução
    └── tsconfig.json        # Arquivo de configuração do TypeScript, definindo opções de compilação

    ```

4. **Rodar o projeto**

Toda vez que for executar o arquivo main, precisa ser rodado o comanda para atualizar a past /out

```
tsc
```
