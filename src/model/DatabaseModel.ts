import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Classe para estabelecer a conexão com o banco de dados postgres
 */
export class DatabaseModel {
    private _config: pg.PoolConfig;
    private _pool: pg.Pool;

    /**
     * Construtor da classe DatabaseModel
     * Inicializa a configuração do pool de conexões com base nas variáveis de ambiente
     */
    constructor() {
        this._config = {
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: parseInt(process.env.DB_PORT as string),
            max: 10,
            idleTimeoutMillis: 10000
        };

        this._pool = new pg.Pool(this._config);
    }

    /**
     * Obtém uma conexão de banco de dados com um usuário e senha específicos
     * @param user Usuário do banco de dados
     * @param password Senha do banco de dados
     * @returns Uma conexão de banco de dados
     */
    public async getConnection(user: string, password: string) {
        const config = {
            ...this._config,
            user: user,
            password: password
        };
        return new pg.Pool(config).connect();
    }

    /**
     * Testa a conexão com o banco de dados
     * @returns Boolean indicando se a conexão foi bem-sucedida
     */
    public async testeConexao() {
        try {
            const client = await this._pool.connect();
            console.log('Database connected!');
            client.release(); // Liberar o cliente de volta ao pool
            return true;
        } catch (error) {
            console.error('Error connecting to database:');
            console.error(error);
            return false;
        }
    }

    /**
     * Getter para o pool de conexões do banco de dados
     * @returns O pool de conexões do banco de dados
     */
    public get pool() {
        return this._pool;
    }
}
