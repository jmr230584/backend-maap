import { Request, Response } from "express";
import { Medico } from "../model/Medico";

interface MedicoDTO {
    nome: string,
    especialidade: string,
    crm: string,
    telefone: string,
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
    static async novo(req: Request, res: Response): Promise<any> {
        try {
            const medicoRecebido: MedicoDTO = req.body;

            const novoMedico = new Medico(
                medicoRecebido.nome,
                medicoRecebido.especialidade,
                medicoRecebido.crm,
                medicoRecebido.telefone,
                medicoRecebido.email
            );

            const respostaClasse = await Medico.cadastroMedico(novoMedico);

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

        /**
     * Remove um medico.
     * @param req Objeto de requisição HTTP com o ID do medico a ser removido.
     * @param res Objeto de resposta HTTP.
     * @returns Mensagem de sucesso ou erro em formato JSON.
     */
        static async remover(req: Request, res: Response): Promise<any> {
            try {
                const idMedico = parseInt(req.params.idMedico as string);
                const result = await Medico.removerMedico(idMedico);
                
                if (result) {
                    return res.status(200).json('Medico removido com sucesso');
                } else {
                    return res.status(401).json('Erro ao deletar Medico');
                }
            } catch (error) {
                console.log("Erro ao remover o Medico");
                console.log(error);
                return res.status(500).send("error");
            }
        }
    
        /**
         * Método para atualizar o cadastro de um Medico.
         * 
         * @param req Objeto de requisição do Express, contendo os dados atualizados do Medico
         * @param res Objeto de resposta do Express
         * @returns Retorna uma resposta HTTP indicando sucesso ou falha na atualização
         */
        static async atualizar(req: Request, res: Response): Promise<any> {
            try {
                // Desestruturando objeto recebido pelo front-end
                const dadosRecebidos: MedicoDTO = req.body;
                
                // Instanciando objeto Medico
                const medico = new Medico(
                    dadosRecebidos.nome,
                    dadosRecebidos.especialidade,
                    dadosRecebidos.crm,
                    dadosRecebidos.telefone,
                    dadosRecebidos.email           
                );
    
                // Define o ID do Medico, que deve ser passado na query string
                medico.setIdMedico(parseInt(req.params.idMedico));
    
                console.log(dadosRecebidos);
    
                // Chama o método para atualizar o cadastro do Medico no banco de dados
                if (await Medico.atualizarCadastroMedico(medico)) {
                    return res.status(200).json({ mensagem: "Medico atualizado com sucesso!" });
                } else {
                    return res.status(400).json('Não foi possível atualizar o Medico no banco de dados');
                }
            } catch (error) {
                // Caso ocorra algum erro, este é registrado nos logs do servidor
                console.error(`Erro no modelo: ${error}`);
                // Retorna uma resposta com uma mensagem de erro
                return res.json({ mensagem: "Erro ao atualizar Medico." });
            }
        }
}


