import { DatabaseModel } from "./DatabaseModel";

// Armazena o pool de conexões com o banco de dados
const database = new DatabaseModel().pool;

/**
 * Classe que representa uma Consulta.
 */
export class Consulta {

    /* Atributos */

    /**
     * Identificador da consulta.
     */
    private idConsulta: number = 0;

    /**
     * Nome do paciente da consulta.
     */
    private nome: string;

    /**
     * Data da consulta.
     */
    private data: Date;

    /**
     * Hora da consulta.
     */
    private hora: string;

    /**
     * Diagnóstico realizado na consulta.
     */
    private diagnostico: string;

    /**
     * Receita médica associada à consulta.
     */
    private receita: string;

    /**
     * Número da sala de atendimento.
     */
    private salaAtendimento: string;

    /**
     * Status da consulta (por exemplo, "agendada", "realizada", etc.).
     */
    private consultaStatus: string;

    /**
     * Identificador do paciente.
     */
    private idPaciente: number;

    /**
     * Identificador do médico responsável pela consulta.
     */
    private idMedico: number;

    /**
     * Identificador de status responsável pela consulta.
     */
    private statusConsultaRegistro: boolean = true;
    /**
     * Construtor da classe Consulta.
     * 
     * @param nome Nome do paciente.
     * @param data Data da consulta.
     * @param hora Hora da consulta.
     * @param diagnostico Diagnóstico realizado.
     * @param receita Receita médica fornecida.
     * @param salaAtendimento Sala de atendimento.
     * @param status Status da consulta.
     */
    constructor(
        nome: string,
        data: Date,
        hora: string,
        diagnostico: string,
        receita: string,
        salaAtendimento: string,
        consultaStatus: string,
        idPaciente: number,
        idMedico: number,
    ) {
        this.nome = nome;
        this.data = data; 
        this.hora = hora;
        this.diagnostico = diagnostico;
        this.receita = receita;
        this.salaAtendimento = salaAtendimento;
        this.consultaStatus = consultaStatus;
        this.idPaciente = idPaciente;
        this.idMedico = idMedico;

        console.log(data);
    }
    

    /* Métodos get e set */

    /**
     * Recupera o identificador da consulta.
     * @returns O identificador da consulta.
     */
    public getIdConsulta(): number {
        return this.idConsulta;
    }

    /**
     * Define o identificador da consulta.
     * @param idConsulta O identificador da consulta.
     */
    public setIdConsulta(idConsulta: number): void {
        this.idConsulta = idConsulta;
    }


    /**
 * Recupera o identificador da consulta.
 * @returns O identificador da consulta.
 */
    public getIdPaciente(): number {
        return this.idPaciente;
    }

    /**
     * Define o identificador da consulta.
     * @param idConsulta O identificador da consulta.
     */
    public setIdPaciente(idPaciente: number): void {
        this.idPaciente = idPaciente;
    }

    /**
* Recupera o identificador da consulta.
* @returns O identificador da consulta.
*/
    public getIdMedico(): number {
        return this.idMedico;
    }

    /**
     * Define o identificador da consulta.
     * @param idConsulta O identificador da consulta.
     */
    public setIdMedico(idMedico: number): void {
        this.idMedico = idMedico;
    }

    /**
     * Recupera o nome do paciente.
     * @returns O nome do paciente.
     */
    public getNome(): string {
        return this.nome;
    }

    /**
     * Define o nome do paciente.
     * @param nome O nome do paciente.
     */
    public setNome(nome: string): void {
        this.nome = nome;
    }

    /**
     * Recupera a data da consulta.
     * @returns A data da consulta.
     */
    public getData(): Date {
        return this.data;
    }

    /**
     * Define a data da consulta.
     * @param data A data da consulta.
     */
    public setData(data: Date): void {
        this.data = data;
    }

    /**
     * Recupera a hora da consulta.
     * @returns A hora da consulta.
     */
    public getHora(): string {
        return this.hora;
    }

    /**
     * Define a hora da consulta.
     * @param hora A hora da consulta.
     */
    public setHora(hora: string): void {
        this.hora = hora;
    }

    /**
     * Recupera o diagnóstico da consulta.
     * @returns O diagnóstico da consulta.
     */
    public getDiagnostico(): string {
        return this.diagnostico;
    }

    /**
     * Define o diagnóstico da consulta.
     * @param diagnostico O diagnóstico da consulta.
     */
    public setDiagnostico(diagnostico: string): void {
        this.diagnostico = diagnostico;
    }

    /**
     * Recupera a receita médica associada à consulta.
     * @returns A receita médica da consulta.
     */
    public getReceita(): string {
        return this.receita;
    }

    /**
     * Define a receita médica associada à consulta.
     * @param receita A receita médica da consulta.
     */
    public setReceita(receita: string): void {
        this.receita = receita;
    }

    /**
     * Recupera o número da sala de atendimento.
     * @returns O número da sala de atendimento.
     */
    public getSalaAtendimento(): string {
        return this.salaAtendimento;
    }

    /**
     * Define o número da sala de atendimento.
     * @param salaAtendimento O número da sala de atendimento.
     */
    public setSalaAtendimento(salaAtendimento: string): void {
        this.salaAtendimento = salaAtendimento;
    }

    /**
     * Recupera o status da consulta.
     * @returns O status da consulta.
     */
    public getConsultaStatus(): string {
        return this.consultaStatus;
    }

    /**
     * Define o status da consulta.
     * @param status O status da consulta.
     */
    public setConsultaStatus(consultaStatus: string): void {
        this.consultaStatus = consultaStatus;
    }

               /**
* Retorna o statusConsultaRegistro no sistema
* 
* @return status do Consulta do sistema 
*/
public getStatusConsultaRegistro(): boolean {
    return this.statusConsultaRegistro;
}


/**
 * Atribui um valoro statusConsultaRegistro do Consulta
 * 
 * @param _statusConsultaRegistro : statusConsultaRegistro do Consulta
 */
public setStatusConsultaRegistro(statusConsultaRegistro: boolean) {
    this.statusConsultaRegistro = statusConsultaRegistro;
}



    /**
    * Busca e retorna uma lista de Consulta do banco de dados.
    * @returns Um array de objetos do tipo `Consulta` em caso de sucesso ou `null` se ocorrer um erro durante a consulta.
    * 
    * - A função realiza uma consulta SQL para obter todas as informações da tabela "Consulta".
    * - Os dados retornados do banco de dados são usados para instanciar objetos da classe `Consulta`.
    * - Cada Consulta é adicionado a uma lista que será retornada ao final da execução.
    * - Se houver falha na consulta ao banco, a função captura o erro, exibe uma mensagem no console e retorna `null`.
    */
    static async listagemConsulta(): Promise<Array<Consulta> | null> {
        // objeto para armazenar a lista de Consulta
        const listaDeConsulta: Array<Consulta> = [];

        try {
            // query de consulta ao banco de dados
            const querySelectConsulta = `SELECT * FROM consulta WHERE status_consulta_registro = true;`;

            // fazendo a consulta e guardando a resposta
            const respostaBD = await database.query(querySelectConsulta);

            // usando a resposta para instanciar um objeto do tipo Consulta
            respostaBD.rows.forEach((linha: any) => {
                // instancia (cria) objeto Consulta
                const novoConsulta = new Consulta(
                    linha.nome,
                    linha.data,
                    linha.hora,
                    linha.diagnostico,
                    linha.receita,
                    linha.sala_atendimento,
                    linha.consulta_status,
                    linha.id_paciente,
                    linha.id_medico
                );

                // atribui o ID objeto
                novoConsulta.setIdConsulta(linha.id_consulta);
                novoConsulta.setNome(linha.nome);

                // adiciona o objeto na lista
                listaDeConsulta.push(novoConsulta);

                console.log(novoConsulta)
            });

            // retorna a lista de Consulta
            return listaDeConsulta;
        } catch (error) {
            console.log('Erro ao buscar lista de Consulta');
            return null;
        }
    }

    /**
     * Realiza o cadastro de um Consulta no banco de dados.
     * 
     * Esta função recebe um objeto do tipo `Consulta` e insere seus dados (marca, modelo, ano e cor)
     * na tabela `Consulta` do banco de dados. O método retorna um valor booleano indicando se o cadastro 
     * foi realizado com sucesso.
     * 
     * @param {Consulta} consulta - Objeto contendo os dados do Consulta que será cadastrado. O objeto `Consulta`
     *                        deve conter os métodos `getMarca()`, `getModelo()`, `getAno()` e `getCor()`
     *                        que retornam os respectivos valores do Consulta.
     * @returns {Promise<boolean>} - Retorna `true` se o Consulta foi cadastrado com sucesso e `false` caso contrário.
     *                               Em caso de erro durante o processo, a função trata o erro e retorna `false`.
     * 
     * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
     *                   no console junto com os detalhes do erro.
     */
    static async cadastroConsulta(consulta: Consulta): Promise<boolean> {
        try {
            // query para fazer insert de um Consulta no banco de dados
            const queryInsertConsulta = `INSERT INTO Consulta (nome, data, hora, diagnostico, receita, sala_atendimento, consulta_status, id_paciente, id_medico)
                                        VALUES ( 
                                            '${consulta.getNome()}', 
                                            '${consulta.getData()}', 
                                            '${consulta.getHora()}', 
                                            '${consulta.getDiagnostico()}',
                                            '${consulta.getReceita()}',
                                            '${consulta.getSalaAtendimento()}',
                                            '${consulta.getConsultaStatus()}',
                                            ${consulta.getIdPaciente()},
                                            ${consulta.getIdMedico()})
                                               RETURNING id_consulta;`;

            console.log(queryInsertConsulta);

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertConsulta);

            console.log(respostaBD)

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Consulta cadastrado com sucesso! ID da Consulta: ${respostaBD.rows[0].id_consulta}`);
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o Consulta. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }

    /**
         * Remove um consulta do banco de dados.
         * 
         * A função realiza a desativação do consulta e suas consultas associadas no banco de dados.
         * 
         * @param id_consulta Identificador único do consulta a ser removido
         * @returns {Promise<boolean>} Retorna true se a operação foi bem-sucedida, e false em caso de erro.
         */
        static async removerConsulta(id_consulta: number): Promise<Boolean> {
            let queryResult = false;
    
            try {
                // Atualiza o status da consulta para indicar que o Consulta não está mais ativo
                const queryDeleteConsulta = `UPDATE consulta 
                                                    SET status_consulta_registro = FALSE
                                                    WHERE id_consulta=${id_consulta};`;
    
                // Executa a atualização de status do Consulta
                await database.query(queryDeleteConsulta)
                    .then((result) => {
                        if (result.rowCount != 0) {
                            queryResult = true; // Operação bem-sucedida
                        }
                    });
    
                return queryResult; // Retorna o resultado da operação
    
            } catch (error) {
                console.log(`Erro na consulta: ${error}`);
                return queryResult; // Retorna false em caso de erro
            }
        }
    
        /**
         * Atualiza os dados de um Consulta no banco de dados.
         * 
         * @param consulta Objeto do tipo Consulta com os novos dados
         * @returns {boolean} Retorna true em caso de sucesso, false em caso de erro
         */
        static async atualizarCadastroConsulta(consulta: Consulta): Promise<Boolean> {
            let queryResult = false; // Variável para armazenar o resultado da operação.
    
            try {
                // Consulta SQL para atualizar os dados do paciente
                const queryAtualizarConsulta = `UPDATE consulta
                                                SET nome='${consulta.getNome()}',
                                                    data='${consulta.getData()}',
                                                    hora='${consulta.getHora()}',
                                                    diagnostico='${consulta.getDiagnostico()}',
                                                    receita='${consulta.getReceita()}',
                                                    sala_atendimento='${consulta.getSalaAtendimento()}',
                                                    consulta_status='${consulta.getConsultaStatus()}',
                                                    id_paciente=${consulta.getIdPaciente()},
                                                    id_medico=${consulta.getIdMedico()}                                                                                                     
                                                WHERE id_consulta=${consulta.idConsulta};`;
    
                // Executa a consulta de atualização
                console.log(queryAtualizarConsulta);
                await database.query(queryAtualizarConsulta)
                    .then((result) => {
                        if (result.rowCount != 0) {
                            queryResult = true; // Operação bem-sucedida
                        }
                    });
    
                return queryResult; // Retorna o resultado da operação
    
            } catch (error) {
                console.log(`Erro na consulta: ${error}`);
                return queryResult; // Retorna false em caso de erro
            }
        }
}