import { server } from "./server";
import dotenv from 'dotenv';
import { DatabaseModel } from "./model/DatabaseModel";

/**
 * Módulo para carregar as variáveis de ambiente
 */
dotenv.config();

/**
 * Configuração da porta do servidor
 */
const portEnv = process.env.SERVER_PORT;
const port: number = portEnv ? parseInt(portEnv) : 3333;

if (isNaN(port) || port < 0 || port > 65535) {
    throw new Error(`Porta inválida: "${portEnv}". Defina SERVER_PORT corretamente no .env`);
}

/**
 * Inicia o servidor após a verificação de conexão com o banco de dados
 */
new DatabaseModel().testeConexao().then((resbd) => {
    console.clear();
    if (resbd) {
        server.listen(port, () => {
            console.info(`Servidor executando no endereço http://localhost:${port}/`);
        });
    } else {
        console.log(`Não foi possível conectar ao banco de dados`);
    }
});