import { DatabaseModel } from "./DatabaseModel";
// Armazena o pool de conexões
const database = new DatabaseModel().pool;

/**
 * Classe que representa o Paciente.
 */
export class Paciente {

    /* Atributos */
    /* Identificador do Paciente */
    private idPaciente: number = 0;
    /* Nome do Paciente */
    private nome: string;
    /* CPF do Paciente */
    private cpf: string;
    /* Telefone do Paciente */
    private telefone: string;
    /* Email do Paciente */
    private email: string;
    /* Data de nascimento do Paciente */
    private dataNascimento: Date;
    /* Endereço do Paciente */
    private endereco: string;

    /**
     * Construtor da classe Paciente
     * 
     * @param nome Nome do Paciente
     * @param cpf CPF do Paciente
     * @param telefone Telefone do Paciente
     * @param email Email do Paciente
     * @param dataNascimento Data de nascimento do Paciente
     * @param endereco Endereço do Paciente
     */
    constructor(
        nome: string,
        cpf: string,
        telefone: string,
        email: string,
        dataNascimento: Date,
        endereco: string
    ) {
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
        this.email = email;
        this.dataNascimento = dataNascimento;
        this.endereco = endereco;
    }

    /* Métodos get e set */
    /**
     * Recupera o identificador do Paciente
     * @returns O identificador do Paciente
     */
    public getIdPaciente(): number {
        return this.idPaciente;
    }

    /**
     * Atribui um valor ao identificador do Paciente
     * @param idPaciente Novo identificador do Paciente
     */
    public setIdPaciente(idPaciente: number): void {
        this.idPaciente = idPaciente;
    }

    /**
     * Retorna o nome do Paciente.
     *
     * @returns {string} O nome do Paciente.
     */
    public getNome(): string {
        return this.nome;
    }

    /**
     * Define o nome do Paciente.
     * 
     * @param nome - O nome do Paciente a ser definido.
     */
    public setNome(nome: string): void {
        this.nome = nome;
    }

    /**
     * Retorna o CPF do Paciente.
     *
     * @returns {string} O CPF do Paciente.
     */
    public getCpf(): string {
        return this.cpf;
    }

    /**
     * Define o CPF do Paciente.
     *
     * @param cpf - O CPF do Paciente.
     */
    public setCpf(cpf: string): void {
        this.cpf = cpf;
    }

    /**
     * Retorna o telefone do Paciente.
     *
     * @returns {string} O telefone do Paciente.
     */
    public getTelefone(): string {
        return this.telefone;
    }

    /**
     * Define o telefone do Paciente.
     * 
     * @param telefone - O telefone do Paciente.
     */
    public setTelefone(telefone: string): void {
        this.telefone = telefone;
    }

    /**
     * Retorna o email do Paciente.
     *
     * @returns {string} O email do Paciente.
     */
    public getEmail(): string {
        return this.email;
    }

    /**
     * Define o email do Paciente.
     * 
     * @param email - O email do Paciente.
     */
    public setEmail(email: string): void {
        this.email = email;
    }

    /**
     * Retorna a data de nascimento do Paciente.
     *
     * @returns {Date} A data de nascimento do Paciente.
     */
    public getDataNascimento(): Date {
        return this.dataNascimento;
    }

    /**
     * Define a data de nascimento do Paciente.
     * 
     * @param dataNascimento - A data de nascimento do Paciente.
     */
    public setDataNascimento(dataNascimento: Date): void {
        this.dataNascimento = dataNascimento;
    }

    /**
     * Retorna o endereço do Paciente.
     *
     * @returns {string} O endereço do Paciente.
     */
    public getEndereco(): string {
        return this.endereco;
    }

    /**
     * Define o endereço do Paciente.
     * 
     * @param endereco - O endereço do Paciente.
     */
    public setEndereco(endereco: string): void {
        this.endereco = endereco;
    }

    /**
     * Busca e retorna uma lista de pacientes do banco de dados.
     * @returns Um array de objetos do tipo Paciente em caso de sucesso ou null se ocorrer um erro durante a consulta.
     * 
     * - A função realiza uma consulta SQL para obter todos os registros da tabela "paciente".
     * - Os dados retornados são utilizados para instanciar objetos da classe Paciente.
     * - Cada paciente instanciado é adicionado a uma lista que será retornada ao final da execução.
     * - Se houver uma falha na consulta ao banco, a função captura o erro, exibe uma mensagem no console e retorna null.
     */
    static async listagemPacientes(): Promise<Array<Paciente> | null> {
        const listagemPacientes: Array<Paciente> = [];

        try {
            const querySelectPaciente = 'SELECT * FROM paciente';
            const respostaBD = await database.query(querySelectPaciente);

            respostaBD.rows.forEach((linha: any) => {
                const novoPaciente = new Paciente(
                    linha.nome,
                    linha.cpf,
                    linha.telefone,
                    linha.email,
                    linha.data_nascimento,
                    linha.endereco
                );

                novoPaciente.setIdPaciente(linha.id_paciente);

                listagemPacientes.push(novoPaciente);
            });

            return listagemPacientes;
        } catch (error) {
            console.log('Erro ao buscar lista de pacientes');
            return null;
        }
    }

    /**
     * Realiza o cadastro de um paciente no banco de dados.
     * 
     * Esta função recebe um objeto do tipo Paciente e insere seus dados (nome, cpf, telefone, email, dataNascimento, endereco)
     * na tabela paciente do banco de dados. O método retorna um valor booleano indicando se o cadastro 
     * foi realizado com sucesso.
     * 
     * @param {Paciente} paciente - Objeto contendo os dados do paciente que será cadastrado. O objeto Paciente
     *                        deve conter os métodos getNome(), getCpf(), getTelefone(), getEmail(),
     *                        getDataNascimento() e getEndereco() que retornam os respectivos valores do paciente.
     * @returns {Promise<boolean>} - Retorna true se o paciente foi cadastrado com sucesso e false caso contrário.
     *                               Em caso de erro durante o processo, a função trata o erro e retorna false.
     * 
     * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
     *                   no console junto com os detalhes do erro.
     */
    static async cadastroPaciente(paciente: Paciente): Promise<boolean> {
        try {
            // Query para fazer insert de um paciente no banco de dados
            const queryInsertPaciente = `INSERT INTO Paciente (nome, cpf, telefone, email, data_nascimento, endereco)
                                        VALUES
                                        ('${paciente.getNome()}', 
                                        '${paciente.getCpf()}',
                                        '${paciente.getTelefone()}',
                                        '${paciente.getEmail()}',
                                        '${paciente.getDataNascimento()}',
                                        '${paciente.getEndereco()}')
                                        RETURNING id_paciente;`;

            // Executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertPaciente);

            // Verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Paciente cadastrado com sucesso! ID do paciente: ${respostaBD.rows[0].id_paciente}`);
                // True significa que o cadastro foi feito
                return true;
            }
            // False significa que o cadastro NÃO foi feito.
            return false;

        } catch (error) {
            // Imprime uma mensagem de erro no console
            console.log('Erro ao cadastrar o paciente. Verifique os logs para mais detalhes.');
            // Imprime o erro no console
            console.log(error);
            // Retorna false indicando que o cadastro falhou
            return false;
        }
    }
}