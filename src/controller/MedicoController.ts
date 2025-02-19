import { Request, Response } from "express";
import { Medico } from "../model/Medico";

interface MedicoDTO {
    nome: string,
    especialidade: string,
    CRM: string,
    telefone: number,
    email: string
}

export class MedicoController {
    /**
     * Retorna a lista completa dos médicos.
     * @param req Objeto de entrada da requisição HTTP.
     * @param res Objeto de saída da resposta HTTP.
     * @returns JSON contendo os médicos e o status 200 se bem-sucedido.
     * @throws Retorna um status 400 e uma mensagem caso ocorra uma falha na listagem.
     */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            const listaDeMedicos = await Medico.listaMedico();
            return res.status(200).json(listaDeMedicos);
        } catch (error) {
            console.log('Falha ao obter a lista de médicos');
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de médicos" });
        }
    }

    /**
     * Controlador responsável por cadastrar um novo médico.
     * @param req Objeto de requisição HTTP, com os dados do médico no formato `MedicoDTO`.
     * @param res Objeto de resposta HTTP.
     * @returns Resposta com status 200 em caso de sucesso ou 400 para erro.
     */
    static async cadastro(req: Request, res: Response): Promise<Response> {
        try {
            const medicoRecebido: MedicoDTO = req.body;
            
            const novoMedico = new Medico(
                medicoRecebido.nome,
                medicoRecebido.especialidade,
                medicoRecebido.CRM,
                medicoRecebido.telefone,
                medicoRecebido.email
            );

            const respostaClasse = await Medico.cadastrarMedico(novoMedico);

            if (respostaClasse) {
                return res.status(200).json({ mensagem: "Médico cadastrado com sucesso!" });
            } else {
                return res.status(400).json({ mensagem: "Erro ao cadastrar o médico. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            console.log(`Falha no cadastro do médico. ${error}`);
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o médico. Entre em contato com o administrador do sistema." });
        }
    }
}


