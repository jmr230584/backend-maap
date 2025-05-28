import { DataBaseModel } from './DataBaseModel';

const database = new DataBaseModel().pool;

export class Usuario {
    private idUsuario: number = 0;
    private uuidUsuario: string = '';
    private nome: string;
    private username: string;
    private email: string;
    private senha: string = '';
    private imagemperfil: string = '';

    constructor(
        _nome: string,
        _username: string,
        _email: string,
    ) {
        this.nome = _nome;
        this.username = _username;
        this.email = _email;
    }

    public getIdUsuario(): number {
        return this.idUsuario;
    }

    public setIdUsuario(idUsuario: number): void {
        this.idUsuario = idUsuario;
    }

    public getUuidUsuario(): string {
        return this.uuidUsuario;
    }

    public setUuidUsuario(uuidUsuario: string): void {
        this.uuidUsuario = uuidUsuario;
    }

    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public getUsername(): string {
        return this.username;
    }

    public setUsername(username: string): void {
        this.username = username;
    }

    public get Email(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getSenha(): string {
        return this.senha;
    }

    public setSenha(senha: string): void {
        this.senha = senha;
    }

    public getImagemPerfil(): string {
        return this.imagemperfil;
    }

    public setImagemPerfil(imagem: string): void {
        this.imagemperfil = imagem;
    }

    static async listarUsuarios(): Promise<Array<Usuario> | null> {

        let listaDeUsuarios: Array<Usuario> = [];

        try {

            const querySelectUsuarios = `   SELECT * FROM usuario;`;

            const respostaBD = await database.query(querySelectUsuarios);

            respostaBD.rows.forEach((usuario) => {
                let novoUsuario = new Usuario(
                    usuario.nome,
                    usuario.username,
                    usuario.email
                );
                  
                novoUsuario.setIdUsuario(usuario.id_usuario);
                novoUsuario.setUuidUsuario(usuario.uuid_usuario);
                novoUsuario.setImagemPerfil(usuario.imagem_perfil);

                listaDeUsuarios.push(novoUsuario);
            });

                return listaDeUsuarios;
            } catch (error) {
                console.error('Erro ao listar usuários:', error);
                return null;
            }
        }
    
        static async cadastroUsuario(usuario: Usuario): Promise<string | null> {
            try {
                const query= `
                INSERT INTO usuario (nome, username, email, senha)
                VALUES ($1, $2, $3, $4)
                RETURNING uuid
                `;

                const valores = [usuario.nome, usuario.username, usuario.email, usuario.senha];

                const resultado = await database.query(query, valores);

                const uuid = resultado.rows[0].uuid;

                usuario.uuidUsuario = uuid;

                return uuid;
            } catch (error) {
                console.error('Erro ao cadastrar usuário:', error);
                return null;
            }
    }

    static async atualizarImagemPerfil(uuid: string, nomeArquivo: string): Promise<void> {
        // Define a query SQL que atualiza o campo imagem_perfil do usuário com o nome do arquivo
        const query = `UPDATE usuario SET imagem_perfil = $1 WHERE uuid = $2`;

        // Executa a query passando o nome do arquivo e o uuid do usuário como parâmetros
        await database.query(query, [nomeArquivo, uuid]);
    }
}
