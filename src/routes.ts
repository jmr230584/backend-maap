import express, { Request, Response } from "express"; // Importa o express e os tipos necessários
import { MedicoController } from "./controller/MedicoController";
import { ConsultaController } from "./controller/ConsultaController";
import { PacienteController } from "./controller/PacienteController";
import  UsuarioController  from './controller/UsuarioController';
import { SERVER_ROUTES } from '../src/appConfig'; // Importa as rotas definidas no arquivo appConfig
import { uploadPerfil } from './config/multerConfig';
// ...existing code...

// Cria um roteador
const router = express.Router();
// Criando uma rota principal para a aplicação
router.get("/", (req: Request, res: Response) => {
    res.json({ mensagem: "Olá, Mundo!" });
});

/* 
* ROTAS PARA MÉDICOS
*/ 
// Rota para listar os médicos
router.get(SERVER_ROUTES.LISTAR_MEDICOS, MedicoController.todos);
// Rota para cadastrar um novo médico
router.post(SERVER_ROUTES.NOVO_MEDICO, MedicoController.novo);
// Rota para deletar um novo médico
router.put(SERVER_ROUTES.REMOVER_MEDICO, MedicoController.remover);
// Rota para atualizar um novo médico
router.put(SERVER_ROUTES.ATUALIZAR_MEDICO, MedicoController.atualizar);


/* 
* ROTAS PARA PACIENTES
*/ 
// Rota para listar os pacientes
router.get(SERVER_ROUTES.LISTAR_PACIENTES, PacienteController.todos);
// Rota para cadastrar um novo paciente
router.post(SERVER_ROUTES.NOVO_PACIENTE, PacienteController.novo);
// Rota para deletar um novo paciente
router.put(SERVER_ROUTES.REMOVER_PACIENTE, PacienteController.remover);
// Rota para atualizar um novo paciente
router.put(SERVER_ROUTES.ATUALIZAR_PACIENTE, PacienteController.atualizar);


/* 
* ROTAS PARA CONSULTAS
*/ 
// Rota para listar as consultas
router.get(SERVER_ROUTES.LISTAR_CONSULTAS, ConsultaController.todos);
// Rota para cadastrar uma nova consulta
router.post(SERVER_ROUTES.NOVA_CONSULTA, ConsultaController.novo);
// Rota para deltar uma nova consulta
router.put(SERVER_ROUTES.REMOVER_CONSULTA, ConsultaController.remover);
// Rota para atualizar uma nova consulta
router.put(SERVER_ROUTES.ATUALIZAR_CONSULTA, ConsultaController.atualizar);


router.get(SERVER_ROUTES.LISTAR_USUARIOS, UsuarioController.todos);
router.post(SERVER_ROUTES.NOVO_USUARIO, uploadPerfil.single('imagemPerfil'), UsuarioController.cadastrar);

export { router }

