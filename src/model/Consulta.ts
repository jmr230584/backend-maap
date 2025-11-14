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
        data: Date | string,
        hora: string,
        diagnostico: string,
        receita: string,
        salaAtendimento: string,
        consultaStatus: string,
        idPaciente: number | string,
        idMedico: number | string
    ) {
        this.nomePaciente = nomePaciente;

        // 🔥 Correção definitiva
        this.data = new Date(data);

        this.hora = hora;
        this.diagnostico = diagnostico;
        this.receita = receita;
        this.salaAtendimento = salaAtendimento;
        this.consultaStatus = consultaStatus;

        // 🔥 Converte sempre para número (evita NaN)
        this.idPaciente = Number(idPaciente);
        this.idMedico = Number(idMedico);
    }

    public getIdConsulta(): number { return this.idConsulta; }
    public setIdConsulta(id: number): void { this.idConsulta = id; }

    public getNomePaciente(): string { return this.nomePaciente; }
    public setNomePaciente(nome: string): void { this.nomePaciente = nome; }

    public getNomeMedico(): string | undefined { return this.nomeMedico; }
    public setNomeMedico(nome: string): void { this.nomeMedico = nome; }

    public getData(): Date { return this.data; }
    public setData(data: Date | string): void { this.data = new Date(data); }

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
    public setIdPaciente(id: number | string): void { this.idPaciente = Number(id); }

    public getIdMedico(): number { return this.idMedico; }
    public setIdMedico(id: number | string): void { this.idMedico = Number(id); }

    public getStatusConsultaRegistro(): boolean { return this.statusConsultaRegistro; }
    public setStatusConsultaRegistro(status: boolean): void { this.statusConsultaRegistro = status; }

    /* ======================================
       MÉTODOS DE BANCO DE DADOS
    ======================================= */

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
                    new Date(linha.data),            // ✔ data corrigida
                    linha.hora,
                    linha.diagnostico,
                    linha.receita,
                    linha.sala_atendimento,
                    linha.consulta_status,
                    Number(linha.id_paciente),        // ✔ conversão correta
                    Number(linha.id_medico)           // ✔ conversão correta
                );

                consulta.setIdConsulta(linha.id_consulta);
                consulta.setNomeMedico(linha.nome_medico);

                lista.push(consulta);
            });

            return lista;

        } catch (error) {
            console.error("Erro ao buscar consultas:", error);
            return null;
        }
    }

    static async listarConsulta(idConsulta: number): Promise<Consulta | null> {
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
                    c.id_paciente,
                    c.id_medico,
                    p.nome AS nome_paciente,
                    m.nome AS nome_medico
                FROM consulta c
                JOIN paciente p ON c.id_paciente = p.id_paciente
                JOIN medico m ON c.id_medico = m.id_medico
                WHERE c.id_consulta = $1
                  AND c.status_consulta_registro = true;
            `;

            const respostaBD = await database.query(query, [idConsulta]);

            if (respostaBD.rows.length === 0) return null;

            const row = respostaBD.rows[0];

            let consulta = new Consulta(
                row.nome_paciente,
                new Date(row.data),                     // ✔ corrigido
                row.hora,
                row.diagnostico,
                row.receita,
                row.sala_atendimento,
                row.consulta_status,
                Number(row.id_paciente),                // ✔ corrigido
                Number(row.id_medico)                   // ✔ corrigido
            );

            consulta.setIdConsulta(row.id_consulta);
            consulta.setNomeMedico(row.nome_medico);

            return consulta;

        } catch (error) {
            console.log(`Erro ao realizar a consulta: ${error}`);
            return null;
        }
    }

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
            return (result?.rowCount ?? 0) > 0;

        } catch (error) {
            console.error("❌ Erro ao cadastrar consulta:", error);
            return false;
        }
    }

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
            console.error("❌ Erro ao atualizar consulta:", error);
            return false;
        }
    }

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
            console.error("❌ Erro ao remover consulta:", error);
            return false;
        }
    }
}
