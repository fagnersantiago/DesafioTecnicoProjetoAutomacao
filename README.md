# Projeto Node.js

Este é um projeto Node.js que apresenta uma rota para executar uma automação.

## Requisitos

Antes de executar o projeto, verifique se você tem o seguinte instalado em seu sistema:

- Node.js: [Download Node.js](https://nodejs.org)
- MongoDB: [Download MongoDB](https://www.mongodb.com)

## Instalação

1. Clone o repositório do projeto ou faça o download dos arquivos.

2. Navegue até o diretório raiz do projeto.

3. Abra um terminal ou prompt de comando e execute o seguinte comando para instalar as dependências:

   ```shell
   yarn install
   ```

## Configuração

1. Certifique-se de que o MongoDB está em execução em sua máquina. Caso contrário, inicie o serviço do MongoDB.

2. No arquivo `.env`, defina as configurações do banco de dados MongoDB, se necessário.

## Execução

1. No terminal ou prompt de comando, execute o seguinte comando para iniciar:

   ```shell
   yarn dev
   ```

2. O servidor será iniciado e estará ouvindo na porta 3333.

3. Utilize uma ferramenta de cliente HTTP (como o Postman) ou espere 5 minutos e o Cron fará requisição automáticamente através da rota abaixo::

   ```
   http://localhost:3333/execute-automation
   ```
