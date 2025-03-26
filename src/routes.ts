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
router.post("/cadastro/medico", MedicoController.novo);
// Rota para deletar um novo médico
router.put("/remover/medico/:idMedico", MedicoController.remover);
// Rota para atualizar um novo médico
router.put("/atualizar/medico/:idMedico", MedicoController.atualizar);


/* 
* ROTAS PARA PACIENTES
*/ 
// Rota para listar os pacientes
router.get("/listar/paciente", PacienteController.todos);
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
router.get("/listar/consulta", ConsultaController.todos);
// Rota para cadastrar uma nova consulta
router.post("/cadastro/consulta", ConsultaController.novo);
// Rota para deltar uma nova consulta
router.put("/remover/consulta/:idConsulta", ConsultaController.remover);
// Rota para atualizar uma nova consulta
router.put("/atualizar/consulta/:idConsulta", ConsultaController.atualizar);


// Exportando as rotas
export { router };
// Criando sua rota principal para a aplicação

