import multer from 'multer'; // Importa o Multer, responsável por lidar com uploads
import path from 'path'; // Módulo para trabalhar com caminhos de arquivos
import crypto from 'crypto'; // Módulo para gerar valores aleatórios
import { Request } from 'express';

/**
 * Gera um nome de arquivo aleatório com 16 caracteres (letras maiúsculas, minúsculas e números).
 * @returns Uma string aleatória de 16 caracteres.
 */
const gerarNomeArquivoAleatorio = (): string => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let nomeAleatorio = '';
    for (let i = 0; i < 16; i++) {
        const indiceAleatorio = crypto.randomInt(0, caracteres.length);
        nomeAleatorio += caracteres.charAt(indiceAleatorio);
    }
    return nomeAleatorio;
};

// Define a configuração de armazenamento dos arquivos
const storage = multer.diskStorage({
    // Define o diretório onde os arquivos enviados serão salvos
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '..', '..', 'uploads')); // Caminho absoluto até a pasta "uploads"
    },

    // Define o nome do arquivo que será salvo
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // Extrai a extensão original do arquivo
        const novoNome = `${gerarNomeArquivoAleatorio()}${ext}`;
        cb(null, novoNome); // Retorna o nome para o multer salvar
    }
});

// Cria o middleware de upload com a configuração de armazenamento definida
export const uploadPerfil = multer({ storage });

// Define a configuração de armazenamento dos arquivos
const storageCapa = multer.diskStorage({
  // Define o diretório onde os arquivos enviados serão salvos
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '..', '..', 'uploads/cover')); // Caminho absoluto até a pasta "uploads"
  },

  // Define o nome do arquivo que será salvo
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Extrai a extensão original do arquivo

    // Tenta obter o UUID do usuário da requisição
    const usuario = (req.body?.usuario);
    const senha = (req.body?.senha);

    const sanitize = (texto: string) => texto
      .replace(/[^a-zA-Z0-9-_ ]/g, '') // remove caracteres especiais (exceto espaço, hífen e underscore)
      .replace(/ /g, "_");             // troca espaços por underscores

    const usuarioSanitizado = sanitize(usuario);
    const senhaSanitizada = sanitize(senha);

    // Cria o nome final do arquivo: uuid-hash-nomeOriginal.ext
    const filename = `${usuarioSanitizado}-${senhaSanitizada}-${file.originalname}`;

    cb(null, filename); // Retorna o nome para o multer salvar
  }
});

// Cria o middleware de upload com a configuração de armazenamento definida
export const uploadCapa = multer({ storage: storageCapa });