import { Request, Response } from "express";
import { Consulta } from "../model/Consulta";

interface ConsultaDTO {
    nome: string,
    data: Date,
    hora: string,
    diagnostico: string,
    receita: string,
    salaAtendimento: string,
    status: string,
    idPaciente: number,
    idMedico: number
}

/**
 * A classe `ConsultaController` estende a classe `Consulta` e é responsável por controlar as requisições relacionadas aos Emprestimos.
 * 
 * - Esta classe atua como um controlador dentro de uma API REST, gerenciando as operações relacionadas ao recurso "Emprestimo".
 * - Herdando de `Consulta`, ela pode acessar métodos e propriedades da classe base.
 */
export class ConsultaController extends Consulta {

    /**
    * Lista todos os Consulta.
    * @param req Objeto de requisição HTTP.
    * @param res Objeto de resposta HTTP.
    * @returns Lista de Consulta em formato JSON com status 200 em caso de sucesso.
    * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de Emprestimos.
    */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            // acessa a função de listar os Consulta e armazena o resultado
            const listaDeConsulta = await Consulta.listagemConsulta();

            // retorna a lista de Consulta há quem fez a requisição web
            return res.status(200).json(listaDeConsulta);
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log('Erro ao acessar listagem de Consulta');

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de Consulta" });
        }
    }

    /**
    * Método controller para cadastrar um novo Consulta.
    * 
    * Esta função recebe uma requisição HTTP contendo os dados de um Consulta no corpo da requisição
    * e tenta cadastrar este Consulta no banco de dados utilizando a função `cadastroConsulta`. Caso o cadastro 
    * seja bem-sucedido, retorna uma resposta HTTP 200 com uma mensagem de sucesso. Caso contrário, retorna
    * uma resposta HTTP 400 com uma mensagem de erro.
    * 
    * @param {Request} req - Objeto de requisição HTTP, contendo o corpo com os dados do Consulta no formato `EmprestimoDTO`.
    * @param {Response} res - Objeto de resposta HTTP usado para retornar o status e a mensagem ao cliente.
    * @returns {Promise<Response>} - Retorna uma resposta HTTP com o status 200 em caso de sucesso, ou 400 em caso de erro.
    * 
    * @throws {Error} - Se ocorrer um erro durante o processo de cadastro, uma mensagem é exibida no console e uma 
    *                   resposta HTTP 400 com uma mensagem de erro é enviada ao cliente.
    */
    static async novo(req: Request, res: Response): Promise<any> {
        try {
            // recuperando informações do corpo da requisição e colocando em um objeto da interface EmprestimoDTO
            const consultaRecebida: ConsultaDTO = req.body;

            // instanciando um objeto do tipo Emprestimo com as informações recebidas
            const novoConsulta = new Consulta(
                consultaRecebida.nome,
                consultaRecebida.data,
                consultaRecebida.hora,
                consultaRecebida.diagnostico,
                consultaRecebida.receita,
                consultaRecebida.salaAtendimento,
                consultaRecebida.status,
                consultaRecebida.idPaciente,
                consultaRecebida.idMedico
            );
            console.log(novoConsulta)

            // Chama a função de cadastro passando o objeto como parâmetro
            const repostaClasse = await Consulta.cadastroConsulta(novoConsulta);

            // verifica a resposta da função
            if (repostaClasse) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Consulta cadastrado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastra o Consulta. Entre em contato com o administrador do sistema." })
            }

        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar um Consulta. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o Consulta. Entre em contato com o administrador do sistema." });
        }
    }

    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            const idConsulta = parseInt(req.query.idConsulta as string);
            const result = await Consulta.removerConsulta(idConsulta);

            if (result) {
                return res.status(200).json('Consulta removida com sucesso');
            } else {
                return res.status(401).json('Erro ao deletar a consulta');
            }
        } catch (error) {
            console.log("Erro ao remover a consulta");
            console.log(error);
            return res.status(500).send("error");
        }
    }
    /**
     * Método para atualizar o cadastro de um consulta.
     * 
     * @param req Objeto de requisição do Express, contendo os dados atualizados do consulta
     * @param res Objeto de resposta do Express
     * @returns Retorna uma resposta HTTP indicando sucesso ou falha na atualização
     */
    static async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            // Desestruturando objeto recebido pelo front-end
            const dadosRecebidos: ConsultaDTO = req.body;

            // Instanciando objeto consulta
            const consulta = new Consulta(
                dadosRecebidos.nome,
                dadosRecebidos.data,
                dadosRecebidos.hora,
                dadosRecebidos.diagnostico,
                dadosRecebidos.receita,
                dadosRecebidos.salaAtendimento,
                dadosRecebidos.status,
                dadosRecebidos.idPaciente,
                dadosRecebidos.idMedico
            );

            // Define o ID do consulta, que deve ser passado na query string
            consulta.setIdConsulta(parseInt(req.query.idConsulta as string));

            console.log(dadosRecebidos);

            // Chama o método para atualizar o cadastro do consulta no banco de dados
            if (await Consulta.atualizarCadastroConsulta(consulta)) {
                return res.status(200).json({ mensagem: "Cadastro atualizado com sucesso!" });
            } else {
                return res.status(400).json('Não foi possível atualizar o consulta no banco de dados');
            }
        } catch (error) {
            // Caso ocorra algum erro, este é registrado nos logs do servidor
            console.error(`Erro no modelo: ${error}`);
            // Retorna uma resposta com uma mensagem de erro
            return res.json({ mensagem: "Erro ao atualizar consulta." });
        }

    }
}

export default ConsultaController;
