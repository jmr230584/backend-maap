import { Request, Response } from "express";
import { Consulta } from "../model/Consulta";

interface ConsultaDTO {
    data: Date,
    hora: string,
    diagnostico: string,
    receita: string,
    salaAtendimento: string,
    consultaStatus: string,
    idPaciente: number,
    idMedico: number,
    statusConsultaRegistro?: boolean
}

/**
 * Controlador responsável pelas requisições relacionadas às consultas.
 */
export class ConsultaController extends Consulta {

    /**
     * Lista todas as consultas (com JOIN paciente e médico).
     */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            const listaDeConsultas = await Consulta.listagemConsulta();
            return res.status(200).json(listaDeConsultas);
        } catch (error) {
            console.error('Erro ao listar consultas:', error);
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de consultas." });
        }
    }


    /**
 * Retorna informações de um aluno
 * @param req Objeto de requisição HTTP
 * @param res Objeto de resposta HTTP.
 * @returns Informações de aluno em formato JSON.
 */
    static async consulta(req: Request, res: Response) {
        try {
            const idConsulta = parseInt(req.query.idConsulta as string);

            const consulta = await Consulta.listarConsulta(idConsulta);
            res.status(200).json(consulta);
        } catch (error) {
            console.log(`Erro ao acessar método herdado: ${error}`);    // Exibe erros da consulta no console
            res.status(500).json("Erro ao recuperar as informações do aluno.");  // Retorna mensagem de erro com status code 400
        }
    }

    /**
     * Cadastra uma nova consulta.
     */
    static async novo(req: Request, res: Response): Promise<any> {
        try {
            const consultaRecebida: ConsultaDTO = req.body;

            // O nome do paciente não é armazenado na tabela consulta, mas podemos buscá-lo depois via JOIN.
            const novaConsulta = new Consulta(
                "", // nomePaciente é apenas informativo para exibição, não vai para o banco
                consultaRecebida.data,
                consultaRecebida.hora,
                consultaRecebida.diagnostico,
                consultaRecebida.receita,
                consultaRecebida.salaAtendimento,
                consultaRecebida.consultaStatus,
                consultaRecebida.idPaciente
            );

            const resposta = await Consulta.cadastroConsulta(novaConsulta);

            if (resposta) {
                return res.status(200).json({ mensagem: "Consulta cadastrada com sucesso!" });
            } else {
                return res.status(400).json({ mensagem: "Erro ao cadastrar a consulta. Verifique os dados e tente novamente." });
            }

        } catch (error) {
            console.error(`Erro ao cadastrar consulta: ${error}`);
            return res.status(500).json({ mensagem: "Erro interno ao cadastrar a consulta." });
        }
    }

    /**
     * Remove (desativa) uma consulta pelo ID.
     */
    static async remover(req: Request, res: Response): Promise<any> {
        try {
            const idConsulta = parseInt(req.params.idConsulta as string);
            const resultado = await Consulta.removerConsulta(idConsulta);

            if (resultado) {
                return res.status(200).json({ mensagem: "Consulta removida com sucesso." });
            } else {
                return res.status(400).json({ mensagem: "Erro ao remover a consulta. ID inválido ou já desativada." });
            }
        } catch (error) {
            console.error("Erro ao remover a consulta:", error);
            return res.status(500).json({ mensagem: "Erro interno ao remover a consulta." });
        }
    }

    /**
     * Atualiza os dados de uma consulta existente.
     */
    static async atualizar(req: Request, res: Response): Promise<any> {
        try {
            const idConsulta = Number(req.params.idConsulta);

            if (isNaN(idConsulta)) {
                console.error("ID da consulta inválido:", req.params.idConsulta);
                return res.status(400).json({ mensagem: "ID da consulta inválido." });
            }

            const dadosRecebidos: ConsultaDTO = req.body;

            const consulta = new Consulta(
                "",
                dadosRecebidos.data,
                dadosRecebidos.hora,
                dadosRecebidos.diagnostico,
                dadosRecebidos.receita,
                dadosRecebidos.salaAtendimento,
                dadosRecebidos.consultaStatus,
                dadosRecebidos.idPaciente
            );

            consulta.setIdConsulta(idConsulta);

            const sucesso = await Consulta.atualizarCadastroConsulta(consulta);

            if (sucesso) {
                return res.status(200).json({ mensagem: "Consulta atualizada com sucesso!" });
            } else {
                return res.status(400).json({ mensagem: "Não foi possível atualizar a consulta. Verifique os dados." });
            }

        } catch (error) {
            console.error(`Erro ao atualizar consulta:`, error);
            return res.status(500).json({ mensagem: "Erro interno ao atualizar a consulta." });
        }
    }

}

export default ConsultaController;
