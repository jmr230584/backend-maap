import { Request, Response } from "express";
import { Paciente } from "../model/Paciente";

interface PacienteDTO {
    idPaciente?: number,
    nome: string,
    cpf: string,
    telefone: string,
    email: string,
    dataNascimento: Date,
    endereco: string,
}

/**
 * A classe PacienteController é responsável por controlar as requisições relacionadas aos Pacientes.
 * 
 * - Como um controlador em uma API REST, esta classe gerencia as operações relacionadas ao recurso "Paciente".
 */
export class PacienteController {

    /**
     * Lista todos os Pacientes.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de Pacientes em formato JSON com status 200 em caso de sucesso.
     * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de Pacientes.
     */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            const listaDePacientes = await Paciente.listagemPacientes();
            return res.status(200).json(listaDePacientes);
        } catch (error) {
            console.log('Erro ao acessar listagem de pacientes:', error);
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de pacientes" });
        }
    }

    /**
 * Retorna informações de um aluno
 * @param req Objeto de requisição HTTP
 * @param res Objeto de resposta HTTP.
 * @returns Informações de aluno em formato JSON.
 */
    static async paciente(req: Request, res: Response) {
        try {
            const idPaciente = parseInt(req.query.idPaciente as string);

            const paciente = await Paciente.listarPaciente(idPaciente);
            res.status(200).json(paciente);
        } catch (error) {
            console.log(`Erro ao acessar método herdado: ${error}`);    // Exibe erros da consulta no console
            res.status(500).json("Erro ao recuperar as informações do aluno.");  // Retorna mensagem de erro com status code 400
        }
    }

    /**
     * Cadastra um novo Paciente.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Mensagem de sucesso em formato JSON com status 200 em caso de sucesso.
     * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao cadastrar o Paciente.
     */
    static async novo(req: Request, res: Response): Promise<any> {
        try {
            // Recuperando informações do corpo da requisição e colocando em um objeto da interface PacienteDTO
            const PacienteRecebido: PacienteDTO = req.body;

            // Instanciando um objeto do tipo Paciente com as informações recebidas
            const novoPaciente = new Paciente(
                PacienteRecebido.nome,
                PacienteRecebido.cpf,
                PacienteRecebido.telefone,
                PacienteRecebido.email,
                PacienteRecebido.dataNascimento,
                PacienteRecebido.endereco);

            // Chama a função de cadastro passando o objeto como parâmetro
            const respostaClasse = await Paciente.cadastroPaciente(novoPaciente);

            // Verifica a resposta da função
            if (respostaClasse) {
                // Retorna uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Paciente cadastrado com sucesso!" });
            } else {
                // Retorna uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastrar o Paciente. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            // Lança uma mensagem de erro no console
            console.log('Erro ao cadastrar um Paciente:', error);

            // Retorna uma mensagem de erro para quem chamou a função
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o Paciente. Entre em contato com o administrador do sistema." });
        }
    }

    static async remover(req: Request, res: Response): Promise<any> {
        try {
            const idPaciente = parseInt(req.query.idPaciente as string);

            const result = await Paciente.removerPaciente(idPaciente);

            if (result) {
                return res.status(200).json('Paciente removido com sucesso');
            } else {
                return res.status(401).json('Erro ao deletar o paciente');
            }
        } catch (error) {
            console.log("Erro ao remover o Paciente");
            console.log(error);
            return res.status(500).send("error");
        }
    }


    static async atualizar(req: Request, res: Response): Promise<any> {
        try {
            const PacienteRecebido: PacienteDTO = req.body;

            const paciente = new Paciente(
                PacienteRecebido.nome,
                PacienteRecebido.cpf,
                PacienteRecebido.telefone,
                PacienteRecebido.email,
                PacienteRecebido.dataNascimento,
                PacienteRecebido.endereco
            );

            // CORREÇÃO
            paciente.setIdPaciente(Number(PacienteRecebido.idPaciente));

            // Chama o método de atualização
            if (await Paciente.atualizarCadastroPaciente(paciente)) {
                return res.status(200).json({ mensagem: "Paciente atualizado com sucesso!" });
            } else {
                return res.status(400).json('Não foi possível atualizar o paciente no banco de dados');
            }
        } catch (error) {
            console.error(`Erro no modelo: ${error}`);
            return res.json({ mensagem: "Erro ao atualizar paciente." });
        }
    }
}

export default PacienteController;
