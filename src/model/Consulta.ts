import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;

export class Consulta {
    private idConsulta: number = 0;
    private nomePaciente: string;
    private nomeMedico?: string;
    private data: Date;
    private hora: string;
    private diagnostico: string;
    private receita: string;
    private salaAtendimento: string;
    private consultaStatus: string;
    private idPaciente: number;
    private idMedico: number;
    private statusConsultaRegistro: boolean = true;

    constructor(
        nomePaciente: string,
        data: Date,
        hora: string,
        diagnostico: string,
        receita: string,
        salaAtendimento: string,
        consultaStatus: string,
        idPaciente: number,
        idMedico: number
    ) {
        this.nomePaciente = nomePaciente;
        this.data = data;
        this.hora = hora;
        this.diagnostico = diagnostico;
        this.receita = receita;
        this.salaAtendimento = salaAtendimento;
        this.consultaStatus = consultaStatus;
        this.idPaciente = idPaciente;
        this.idMedico = idMedico;
    }

    public getIdConsulta(): number { return this.idConsulta; }
    public setIdConsulta(id: number): void { this.idConsulta = id; }

    public getNomePaciente(): string { return this.nomePaciente; }
    public setNomePaciente(nome: string): void { this.nomePaciente = nome; }

    public getNomeMedico(): string | undefined { return this.nomeMedico; }
    public setNomeMedico(nome: string): void { this.nomeMedico = nome; }

    public getData(): Date { return this.data; }
    public setData(data: Date): void { this.data = data; }

    public getHora(): string { return this.hora; }
    public setHora(hora: string): void { this.hora = hora; }

    public getDiagnostico(): string { return this.diagnostico; }
    public setDiagnostico(d: string): void { this.diagnostico = d; }

    public getReceita(): string { return this.receita; }
    public setReceita(r: string): void { this.receita = r; }

    public getSalaAtendimento(): string { return this.salaAtendimento; }
    public setSalaAtendimento(s: string): void { this.salaAtendimento = s; }

    public getConsultaStatus(): string { return this.consultaStatus; }
    public setConsultaStatus(status: string): void { this.consultaStatus = status; }

    public getIdPaciente(): number { return this.idPaciente; }
    public setIdPaciente(id: number): void { this.idPaciente = id; }

    public getIdMedico(): number { return this.idMedico; }
    public setIdMedico(id: number): void { this.idMedico = id; }

    public getStatusConsultaRegistro(): boolean { return this.statusConsultaRegistro; }
    public setStatusConsultaRegistro(status: boolean): void { this.statusConsultaRegistro = status; }

    /* ===============================
       MÉTODOS DE BANCO DE DADOS
    =============================== */

    /**
     * Lista todas as consultas com nomes de paciente e médico.
     */
    static async listagemConsulta(): Promise<Array<Consulta> | null> {
        const lista: Array<Consulta> = [];
        try {
            const query = `
                SELECT 
                    c.id_consulta,
                    c.data,
                    c.hora,
                    c.diagnostico,
                    c.receita,
                    c.sala_atendimento,
                    c.consulta_status,
                    p.nome AS nome_paciente,
                    m.nome AS nome_medico,
                    c.id_paciente,
                    c.id_medico
                FROM consulta c
                JOIN paciente p ON c.id_paciente = p.id_paciente
                JOIN medico m ON c.id_medico = m.id_medico
                WHERE c.status_consulta_registro = true;
            `;

            const resposta = await database.query(query);

            resposta.rows.forEach((linha: any) => {
                const consulta = new Consulta(
                    linha.nome_paciente,
                    linha.data,
                    linha.hora,
                    linha.diagnostico,
                    linha.receita,
                    linha.sala_atendimento,
                    linha.consulta_status,
                    linha.id_paciente,
                    linha.id_medico
                );

                consulta.setIdConsulta(linha.id_consulta);
                consulta.setNomeMedico(linha.nome_medico);
                lista.push(consulta);
            });

            return lista;

        } catch (error) {
            console.error('Erro ao buscar consultas:', error);
            return null;
        }
    }

        /**
             * Retorna as informações de um aluno informado pelo ID
             * 
             * @param idConsulta Identificador único do aluno
             * @returns Objeto com informações do aluno
             */
            static async listarConsulta(idConsulta: number): Promise<Consulta | null> {
                try {
                    // Bloco try: aqui tentamos executar o código que pode gerar um erro.
                    // Se ocorrer algum erro dentro deste bloco, ele será capturado pelo catch.
        
                    // Define a query SQL para selecionar um aluno com base no ID fornecido
                    const querySelectConsulta = `SELECT * FROM consulta WHERE id_consulta = ${idConsulta}`;
        
                    // Executa a consulta no banco de dados e aguarda o resultado
                    const respostaBD = await database.query(querySelectConsulta);
        
                    // Cria um novo objeto da classe Aluno com os dados retornados do banco
                    let consulta = new Consulta(
                        respostaBD.rows[0].nomePaciente,             // Nome do aluno
                        respostaBD.rows[0].data,  // Data de nascimento do aluno
                        respostaBD.rows[0].hora,         // Endereço do aluno
                        respostaBD.rows[0].diagnostico,             // Nome do aluno
                        respostaBD.rows[0].receita,        // Sobrenome do aluno
                        respostaBD.rows[0].salaAtendimento,  // Data de nascimento do aluno
                        respostaBD.rows[0].consultaStatus,     
                        respostaBD.rows[0].idPaciente,        // Sobrenome do aluno
                        respostaBD.rows[0].idMedico          // Celular do aluno
                    );
        
                    // Define o ID do aluno no objeto Aluno
                    consulta.setIdConsulta(respostaBD.rows[0].id_consulta);
        
                    // Define o RA (Registro Acadêmico) do aluno
                    consulta.setIdPaciente(respostaBD.rows[0].id_paciente);
        
                    // Define o status do aluno (ativo, inativo, etc.)
                    consulta.setConsultaStatus(respostaBD.rows[0].consulta_status);
        
                    // Retorna o objeto aluno preenchido com os dados do banco
                    return consulta;
                } catch (error) {
                    // Bloco catch: se algum erro ocorrer no bloco try, ele será capturado aqui.
                    // Isso evita que o erro interrompa a execução do programa.
        
                    // Exibe uma mensagem de erro no console para facilitar o debug
                    console.log(`Erro ao realizar a consulta: ${error}`);
        
                    // Retorna null para indicar que não foi possível buscar o aluno
                    return null;
                }
            }

    /**
     * Cadastra nova consulta.
     */
    static async cadastroConsulta(consulta: Consulta): Promise<boolean> {
        try {
            const query = `
                INSERT INTO consulta 
                (data, hora, diagnostico, receita, sala_atendimento, consulta_status, id_paciente, id_medico)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING id_consulta;
            `;

            const values = [
                consulta.getData(),
                consulta.getHora(),
                consulta.getDiagnostico(),
                consulta.getReceita(),
                consulta.getSalaAtendimento(),
                consulta.getConsultaStatus(),
                consulta.getIdPaciente(),
                consulta.getIdMedico()
            ];

            const result = await database.query(query, values);
            if ((result?.rowCount ?? 0) > 0) {
                console.log(`✅ Consulta cadastrada (ID: ${result.rows[0].id_consulta})`);
                return true;
            }

            return false;
        } catch (error) {
            console.error('❌ Erro ao cadastrar consulta:', error);
            return false;
        }
    }

    /**
     * Atualiza uma consulta existente.
     */
    static async atualizarCadastroConsulta(consulta: Consulta): Promise<boolean> {
        try {
            const query = `
                UPDATE consulta
                SET 
                    data = $1,
                    hora = $2,
                    diagnostico = $3,
                    receita = $4,
                    sala_atendimento = $5,
                    consulta_status = $6,
                    id_paciente = $7,
                    id_medico = $8
                WHERE id_consulta = $9;
            `;

            const values = [
                consulta.getData(),
                consulta.getHora(),
                consulta.getDiagnostico(),
                consulta.getReceita(),
                consulta.getSalaAtendimento(),
                consulta.getConsultaStatus(),
                consulta.getIdPaciente(),
                consulta.getIdMedico(),
                consulta.getIdConsulta()
            ];

            const result = await database.query(query, values);
            return (result?.rowCount ?? 0) > 0;

        } catch (error) {
            console.error('❌ Erro ao atualizar consulta:', error);
            return false;
        }
    }

    /**
     * Remove (desativa) uma consulta.
     */
    static async removerConsulta(idConsulta: number): Promise<boolean> {
        try {
            const query = `
                UPDATE consulta
                SET status_consulta_registro = false
                WHERE id_consulta = $1;
            `;
            const result = await database.query(query, [idConsulta]);
            return (result?.rowCount ?? 0) > 0;
        } catch (error) {
            console.error('❌ Erro ao remover consulta:', error);
            return false;
        }
    }
}
