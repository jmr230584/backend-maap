
import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;

/**
 * Classe que representa um médico.
 */
export class Medico {

    /* Atributos */

    /**
     * Identificador do médico.
     */
    private idMedico: number = 0;

    /**
     * Nome do médico.
     */
    private nome: string;

    /**
     * Especialidade do médico.
     */
    private especialidade: string;

    /**
     * CRM do médico.
     */
    private crm: string;

    /**
     * Telefone do médico.
     */
    private telefone: number;

    /**
     * Email do médico. 
     */
    private email: string;

    /**
     * status do médico. 
     */
    private statusMedico: boolean = true;

    /**
     * Construtor da classe Medico.
     * 
     * @param nome Nome do médico.
     * @param especialidade Especialidade do médico.
     * @param crm CRM do médico.
     * @param telefone Telefone do médico.
     * @param email Email do médico.
     */
    constructor(
        nome: string,
        especialidade: string,
        crm: string,
        telefone: number,
        email: string
    ) {
        this.nome = nome;
        this.especialidade = especialidade;
        this.crm = crm;
        this.telefone = telefone;
        this.email = email;
    }

    /* Métodos get e set */

    /**
     * Recupera o identificador do médico.
     * @returns O identificador do médico.
     */
    public getIdMedico(): number {
        return this.idMedico;
    }

    /**
     * Define o identificador do médico.
     * @param idMedico O identificador do médico.
     */
    public setIdMedico(idMedico: number): void {
        this.idMedico = idMedico;
    }

    /**
     * Recupera o nome do médico.
     * @returns O nome do médico.
     */
    public getNome(): string {
        return this.nome;
    }

    /**
     * Define o nome do médico.
     * @param nome O nome do médico.
     */
    public setNome(nome: string): void {
        this.nome = nome;
    }

    /**
     * Recupera a especialidade do médico.
     * @returns A especialidade do médico.
     */
    public getEspecialidade(): string {
        return this.especialidade;
    }

    /**
     * Define a especialidade do médico.
     * @param especialidade A especialidade do médico.
     */
    public setEspecialidade(especialidade: string): void {
        this.especialidade = especialidade;
    }

    /**
     * Recupera o CRM do médico.
     * @returns O CRM do médico.
     */
    public getCrm(): string {
        return this.crm;
    }

    /**
     * Define o CRM do médico.
     * @param crm O CRM do médico.
     */
    public setCrm(crm: string): void {
        this.crm = crm;
    }

    /**
     * Recupera o telefone do médico.
     * @returns O telefone do médico.
     */
    public getTelefone(): number {
        return this.telefone;
    }

    /**
     * Define o telefone do médico.
     * @param telefone O telefone do médico.
     */
    public setTelefone(telefone: number): void {
        this.telefone = telefone;
    }

    /**
     * Recupera o email do médico.
     * @returns O email do médico.
     */
    public getEmail(): string {
        return this.email;
    }

    /**
     * Define o email do médico.
     * @param email O email do médico.
     */
    public setEmail(email: string): void {
        this.email = email;
    }

        /**
* Retorna o statusMedico no sistema
* 
* @return status do Medico do sistema 
*/
public getStatusMedico(): boolean {
    return this.statusMedico;
}


/**
 * Atribui um valoro statusMedico do Medico
 * 
 * @param _statusMedico : statusMedico do Medico
 */
public setStatusMedico(_statusMedico: boolean) {
    this.statusMedico = _statusMedico;
}


    /**
     * Realiza a listagem de médicos no banco de dados.
     * 
     * Esta função consulta a tabela `medico` e retorna uma lista de objetos do tipo `Medico`. 
     * Se houver um erro durante a consulta, a função retorna `null`.
     * 
     * @returns {Promise<Array<Medico> | null>} - Um array de objetos do tipo `Medico` em caso de sucesso ou `null` se ocorrer um erro durante a consulta.
     */
    static async listaMedico(): Promise<Array<Medico> | null> {
        const listaDeMedicos: Array<Medico> = [];

        try {
            // Query de consulta ao banco de dados
            const querySelectMedico = `SELECT * FROM medico;`;

            // Fazendo a consulta e guardando a resposta
            const respostaBD = await database.query(querySelectMedico);

            // Usando a resposta para instanciar objetos do tipo Medico
            respostaBD.rows.forEach((linha: any) => {
                const novoMedico = new Medico(
                    linha.nome,
                    linha.especialidade,
                    linha.crm,
                    linha.telefone,
                    linha.email
                );
                // Atribui o ID ao objeto
                novoMedico.setIdMedico(linha.id_medico);

                // Adiciona o objeto na lista
                listaDeMedicos.push(novoMedico);
            });

            // Retorna a lista de médicos
            return listaDeMedicos;
        } catch (error) {
            console.log('Erro ao buscar lista de médicos. Verifique os logs para mais detalhes.');
            console.log(error);
            return null;
        }
    }

    /**
     * Cadastra um novo médico no banco de dados.
     * 
     * Esta função recebe um objeto `Medico`, extrai as informações relevantes e realiza uma operação de inserção (INSERT) na tabela `medico`.
     * Se o cadastro for bem-sucedido, a função retorna `true`, caso contrário, retorna `false`.
     * 
     * @param {Medico} medico - Objeto contendo os dados do médico a ser cadastrado.
     * 
     * @returns {Promise<boolean>} - Retorna `true` se o cadastro foi realizado com sucesso, ou `false` se ocorreu um erro.
     */
    static async cadastroMedico(medico: Medico): Promise<boolean> {
        try {
            // Query para fazer insert de um médico no banco de dados
            const queryInsertMedico = `INSERT INTO medico (nome, especialidade, crm, telefone, email)
                          VALUES
                          ('${medico.getNome()}', 
                           '${medico.getEspecialidade()}', 
                           '${medico.getCrm()}', 
                           '${medico.getTelefone()}', 
                           '${medico.getEmail()}')
                          RETURNING id_medico;`;

            // Executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertMedico);

            // Verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Médico cadastrado com sucesso! ID do médico: ${respostaBD.rows[0].id_medico}`);
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

        } catch (error) {
            // Imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o médico. Verifique os logs para mais detalhes.');
            // Imprime o erro no console
            console.log(error);
            // Retorno um valor falso
            return false;
        }
    }

    
    /**
     * Remove um Medico do banco de dados
     * @param idMedico ID do Medico a ser removido
     * @returns Boolean indicando se a remoção foi bem-sucedida
    */
    static async removerMedico(id_medico: number): Promise<Boolean> {
        // variável para controle de resultado da consulta (query)
        let queryResult = false;

        try {
            // Cria a consulta (query) para remover o medico
            const queryDeleteConsultaMedico = `UPDATE consulta 
                                                    SET status_consulta_registro = FALSE
                                                    WHERE id_medico=${id_medico};`;

            // remove os emprestimos associado ao Medico
            await database.query(queryDeleteConsultaMedico);

            // Construção da query SQL para deletar o Medico.
            const queryDeleteMedico = `UPDATE medico 
                                        SET status_medico = FALSE
                                        WHERE id_medico=${id_medico};`;
                                        

            // Executa a query de exclusão e verifica se a operação foi bem-sucedida.
            await database.query(queryDeleteMedico)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true; // Se a operação foi bem-sucedida, define queryResult como true.
                    }
                });

            // retorna o resultado da query
            return queryResult;

            // captura qualquer erro que aconteça
        } catch (error) {
            // Em caso de erro na consulta, exibe o erro no console e retorna false.
            console.log(`Erro na consulta: ${error}`);
            // retorna false
            return queryResult;
        }
    }


    /**
    * Atualiza os dados de um aluno no banco de dados.
    * @param medico Objeto do tipo Medico com os novos dados
    * @returns true caso sucesso, false caso erro
    */
    static async atualizarCadastroMedico(medico: Medico): Promise<Boolean> {
        let queryResult = false; // Variável para armazenar o resultado da operação.
        try {
            // Construção da query SQL para atualizar os dados do medico no banco de dados.
            const queryAtualizarMedico = `UPDATE Aluno SET 
                                            nome = '${medico.getNome().toUpperCase()}', 
                                            especialidade = '${medico.getEspecialidade().toUpperCase()}',
                                            crm = '${medico.getCrm()}', 
                                            telefone = '${medico.getTelefone().toExponential()}', 
                                            email = '${medico.getEmail().toLowerCase()}'                                            
                                        WHERE id_medico = ${medico.idMedico}`;

            // Executa a query de atualização e verifica se a operação foi bem-sucedida.
            await database.query(queryAtualizarMedico)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true; // Se a operação foi bem-sucedida, define queryResult como true.
                    }
                });

            // Retorna o resultado da operação para quem chamou a função.
            return queryResult;
        } catch (error) {
            // Em caso de erro na consulta, exibe o erro no console e retorna false.
            console.log(`Erro na consulta: ${error}`);
            return queryResult;
        }
    }
}