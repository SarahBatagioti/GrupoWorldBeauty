## Instruções para rodar a aplicação:
### Entre na pasta backend e instale as dependências
```
npm install
```
### Configure sua conexão com o banco de dados
```
DB_NAME=''
DB_USER=''
DB_PASSWORD=''
DB_HOST=''
DATABASE_URL=""

```
### Faça a migration do banco de dados
```
npx prisma db push
```
### Rode o backend
```
npm run dev
```
### Entre na pasta frontend e instale as dependências
```
npm install
```
### Execute o frontend
```
npm start
```
