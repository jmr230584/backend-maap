import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;

export class Consulta {
    private idConsulta: number = 0;
    private data: Date;
    private hora: string;
    private salaAtendimento: string;
    private consultaStatus: string;
    private idPaciente: number;
    private idMedico: number;
    private nomePaciente?: string;
    private nomeMedico?: string;
    private statusConsultaRegistro: boolean = true;

    constructor(
        data: Date | string,
        hora: string,
        salaAtendimento: string,
        consultaStatus: string,
        idPaciente: number | string,
        idMedico: number | string,
        nomePaciente?: string,
        nomeMedico?: string
    ) {
        this.data = new Date(data);
        this.hora = hora;
        this.salaAtendimento = salaAtendimento;
        this.consultaStatus = consultaStatus;
        this.idPaciente = Number(idPaciente) || 0;
        this.idMedico = Number(idMedico) || 0;
        this.nomePaciente = nomePaciente;
        this.nomeMedico = nomeMedico;
    }

    public getIdConsulta(): number { return this.idConsulta; }
    public setIdConsulta(id: number): void { this.idConsulta = id; }

    public getData(): Date { return this.data; }
    public setData(data: Date | string): void { this.data = new Date(data); }

    public getHora(): string { return this.hora; }
    public setHora(hora: string): void { this.hora = hora; }

    public getSalaAtendimento(): string { return this.salaAtendimento; }
    public setSalaAtendimento(s: string): void { this.salaAtendimento = s; }

    public getConsultaStatus(): string { return this.consultaStatus; }
    public setConsultaStatus(status: string): void { this.consultaStatus = status; }

    public getIdPaciente(): number { return this.idPaciente; }
    public setIdPaciente(id: number | string): void { this.idPaciente = Number(id) || 0; }

    public getIdMedico(): number { return this.idMedico; }
    public setIdMedico(id: number | string): void { this.idMedico = Number(id) || 0; }

    public getNomePaciente(): string | undefined { return this.nomePaciente; }
    public setNomePaciente(n: string): void { this.nomePaciente = n; }

    public getNomeMedico(): string | undefined { return this.nomeMedico; }
    public setNomeMedico(n: string): void { this.nomeMedico = n; }

    public getStatusConsultaRegistro(): boolean { return this.statusConsultaRegistro; }
    public setStatusConsultaRegistro(status: boolean): void { this.statusConsultaRegistro = status; }

    static async listagemConsulta(): Promise<Array<Consulta> | null> {
        const lista: Array<Consulta> = [];
        try {
            const query = `
                SELECT 
                    c.id_consulta,
                    c.data,
                    c.hora,
                    c.sala_atendimento,
                    c.consulta_status,
                    c.id_paciente,
                    c.id_medico,
                    p.nome AS nome_paciente,
                    m.nome AS nome_medico
                FROM consulta c
                JOIN paciente p ON c.id_paciente = p.id_paciente
                JOIN medico m ON c.id_medico = m.id_medico
                WHERE c.status_consulta_registro = true;
            `;

            const resposta = await database.query(query);

            resposta.rows.forEach((linha: any) => {
                const consulta = new Consulta(
                    new Date(linha.data),
                    linha.hora,
                    linha.sala_atendimento,
                    linha.consulta_status,
                    Number(linha.id_paciente),
                    Number(linha.id_medico),
                    linha.nome_paciente,
                    linha.nome_medico
                );

                consulta.setIdConsulta(linha.id_consulta);
                lista.push(consulta);
            });

            return lista;

        } catch {
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
                new Date(row.data),
                row.hora,
                row.sala_atendimento,
                row.consulta_status,
                Number(row.id_paciente),
                Number(row.id_medico),
                row.nome_paciente,
                row.nome_medico
            );

            consulta.setIdConsulta(row.id_consulta);
            return consulta;

        } catch {
            return null;
        }
    }

    static async cadastroConsulta(consulta: Consulta): Promise<boolean> {
        try {
            const query = `
                INSERT INTO consulta 
                (data, hora, sala_atendimento, consulta_status, id_paciente, id_medico)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id_consulta;
            `;

            const values = [
                consulta.getData(),
                consulta.getHora(),
                consulta.getSalaAtendimento(),
                consulta.getConsultaStatus(),
                consulta.getIdPaciente(),
                consulta.getIdMedico()
            ];

            const result = await database.query(query, values);
            return (result?.rowCount ?? 0) > 0;

        } catch {
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
                    sala_atendimento = $3,
                    consulta_status = $4,
                    id_paciente = $5,
                    id_medico = $6
                WHERE id_consulta = $7;
            `;

            const values = [
                consulta.getData(),
                consulta.getHora(),
                consulta.getSalaAtendimento(),
                consulta.getConsultaStatus(),
                consulta.getIdPaciente(),
                consulta.getIdMedico(),
                consulta.getIdConsulta()
            ];

            const result = await database.query(query, values);
            return (result?.rowCount ?? 0) > 0;

        } catch {
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

        } catch {
            return false;
        }
    }
}
