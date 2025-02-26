import { Request, Response, Router } from "express";
import { MedicoController } from "./controller/MedicoController";
import { ConsultaController } from "./controller/ConsultaController";
import { PacienteController } from "./controller/PacienteController";

// Cria um roteador
const router = Router();
// Criando uma rota principal para a aplicação
router.get("/", (req: Request, res: Response) => {
    res.json({ mensagem: "Olá, Mundo!" });
});

/* 
* ROTAS PARA MÉDICOS
*/ 
// Rota para listar os médicos
router.get("/listar/medico", MedicoController.todos);
// Rota para cadastrar um novo médico
router.get("/listar/cadastro", MedicoController.novo);


/* 
* ROTAS PARA PACIENTES
*/ 
// Rota para listar os pacientes
router.get("/listar/paciente", PacienteController.todos);
router.get("/listar/cadastro", PacienteController.novo);
// Rota para cadastrar um novo paciente


/* 
* ROTAS PARA CONSULTAS
*/ 
// Rota para listar as consultas
router.get("/listar/consulta", ConsultaController.todos);
// Rota para cadastrar uma nova consulta
router.get("/listar/cadastro", ConsultaController.novo);


// Exportando as rotas
export { router };
// Criando sua rota principal para a aplicação

