const SERVER_ROUTES = {
    LISTAR_MEDICOS: '/listar/medicos',
    NOVO_MEDICO: '/cadastro/medico',
    REMOVER_MEDICO: '/remover/medico/:idMedico',
    ATUALIZAR_MEDICO: '/atualizar/medico/:idMedico',
 
    LISTAR_PACIENTES: '/listar/pacientes',
    NOVO_PACIENTE: '/cadastro/paciente',
    REMOVER_PACIENTE: '/remover/paciente/:idPaciente',
    ATUALIZAR_PACIENTE: '/atualizar/paciente/:idPaciente',

    LISTAR_CONSULTAS: '/listar/consultas',
    NOVA_CONSULTA: '/cadastro/consulta',
    REMOVER_CONSULTA: '/remover/consulta/:idConsulta',
    ATUALIZAR_CONSULTA: '/atualizar/consulta/:idConsulta',
    
    NOVO_USUARIO: '/novo/usuario',
    ATUALIZAR_USUARIO: '/atualiza/usuario',
    REMOVER_USUARIO: '/remove/usuario',
    LISTAR_USUARIOS: '/lista/usuarios',
    
   
    
}

export { SERVER_ROUTES }