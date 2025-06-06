import express, { Request, Response } from "express"; // Importa o express e os tipos necessários
import { MedicoController } from "./controller/MedicoController";
import { ConsultaController } from "./controller/ConsultaController";
import { PacienteController } from "./controller/PacienteController";
import  UsuarioController  from './controller/UsuarioController';
import { SERVER_ROUTES } from '../src/appConfig'; // Importa as rotas definidas no arquivo appConfig
import { uploadPerfil } from './config/multerConfig';
import { Auth } from './util/Auth'; // Importa o middleware de autenticação
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
router.get("/listar/medicos", MedicoController.todos);
// Rota para cadastrar um novo médico
router.post("/cadastro/medico", MedicoController.novo);
// Rota para deletar um novo médico
router.put("/remover/medico/:idMedico", MedicoController.remover);
// Rota para atualizar um novo médico
router.put("/atualizar/medico/:idMedico", MedicoController.atualizar);


/* 
* ROTAS PARA PACIENTES
*/ 
// Rota para listar os pacientes
router.get("/listar/pacientes", PacienteController.todos);
// Rota para cadastrar um novo paciente
router.post("/cadastro/paciente", PacienteController.novo);
// Rota para deletar um novo paciente
router.put("/remover/paciente/:idPaciente", PacienteController.remover);
// Rota para atualizar um novo paciente
router.put("/atualizar/paciente/:idPaciente", PacienteController.atualizar);


/* 
* ROTAS PARA CONSULTAS
*/ 
// Rota para listar as consultas
router.get("/listar/consultas", ConsultaController.todos);
// Rota para cadastrar uma nova consulta
router.post("/cadastro/consulta", ConsultaController.novo);
// Rota para deltar uma nova consulta
router.put("/remover/consulta/:idConsulta", ConsultaController.remover);
// Rota para atualizar uma nova consulta
router.put("/atualizar/consulta/:idConsulta", ConsultaController.atualizar);


router.get("/listar/usuarios", UsuarioController.todos);
router.post("/cadastro/usuario", uploadPerfil.single('imagemPerfil'), UsuarioController.cadastrar);

router.get('/rota-protegida', Auth.verifyToken, (req: Request, res: Response) => { res.send('Rota protegida, se você está vendo essa mensagem é porque está autenticado no sistema') });
router.post('/login', Auth.validacaoUsuario);


export { router }

