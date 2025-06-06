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

    LISTAR_USUARIOS: '/listar/usuarios',
    NOVO_USUARIO: '/cadastro/usuario',
    REMOVER_USUARIO: '/remover/usuario/:idUsuario',
    ATUALIZAR_USUARIO: '/atualizar/usuario/:idUsuario',
    
   
    
}

export { SERVER_ROUTES }