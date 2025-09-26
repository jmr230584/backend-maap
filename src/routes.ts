import express, { Request, Response } from "express"; // Importa o express e os tipos necessários
import { MedicoController } from "./controller/MedicoController";
import { ConsultaController } from "./controller/ConsultaController";
import { PacienteController } from "./controller/PacienteController";
import UsuarioController from "./controller/UsuarioController";

import { Auth } from './util/Auth';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

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
router.get("/listar/medicos", Auth.verifyToken, MedicoController.todos);
// Rota para cadastrar um novo médico
router.post("/cadastro/medico", Auth.verifyToken, MedicoController.novo);
// Rota para deletar um novo médico
router.put("/remover/medico/:idMedico", Auth.verifyToken, MedicoController.remover);
// Rota para atualizar um novo médico
router.put("/atualizar/medico/:idMedico", Auth.verifyToken, MedicoController.atualizar);


/* 
* ROTAS PARA PACIENTES
*/ 
// Rota para listar os pacientes
router.get("/listar/pacientes", Auth.verifyToken, PacienteController.todos);
// Rota para cadastrar um novo paciente
router.post("/cadastro/paciente", Auth.verifyToken, PacienteController.novo);
// Rota para deletar um novo paciente
router.put("/remover/paciente/:idPaciente", Auth.verifyToken, PacienteController.remover);
// Rota para atualizar um novo paciente
router.put("/atualizar/paciente/:idPaciente", Auth.verifyToken, PacienteController.atualizar);


/* 
* ROTAS PARA CONSULTAS
*/ 
// Rota para listar as consultas
router.get("/listar/consultas", Auth.verifyToken, ConsultaController.todos);
// Rota para cadastrar uma nova consulta
router.post("/cadastro/consulta", Auth.verifyToken, ConsultaController.novo);
// Rota para deltar uma nova consulta
router.put("/remover/consulta/:idConsulta", Auth.verifyToken, ConsultaController.remover);
// Rota para atualizar uma nova consulta 
router.put("/atualizar/consulta", Auth.verifyToken, ConsultaController.atualizar);

router.post("/novo/usuario", upload.single('imagemPerfil'), UsuarioController.novo);
router.get("/lista/usuarios", UsuarioController.todos);


router.post('/login', Auth.validacaoUsuario);
router.get('/rota-protegida', Auth.verifyToken, (req: Request, res: Response) => { res.send('Rota protegida, se você está vendo essa mensagem é porque está autenticado no sistema') });


export { router }

