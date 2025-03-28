CREATE TABLE Paciente (
    id_paciente SERIAL PRIMARY KEY,
	nome VARCHAR (80) NOT NULL,
    cpf VARCHAR (20) UNIQUE NOT NULL,
    telefone VARCHAR (20) NOT NULL,
	email VARCHAR (80),
	data_nascimento DATE,
    endereco VARCHAR (200)
);

ALTER TABLE paciente ADD COLUMN status_paciente BOOLEAN DEFAULT TRUE;

INSERT INTO Paciente (nome, cpf, telefone, email, data_nascimento, endereco) VALUES
('João Silva', '123.456.789-00', '(16)99344-4322', 'silvinha@email.com', '1985-06-15', 'Rua A, 123 - Centro'),
('Maria Oliveira', '987.654.321-00', '(16)54321-9998', 'maria8@email.com', '1992-04-23', 'Av. B, 456 - Bairro X'),
('Antonio Souza', '321.654.987-00', '(16)17899-3117', 'antoinsouzagmail.com', '1980-12-10', 'Rua C, 789 - Bairro Y');





CREATE TABLE Medico (
    id_medico SERIAL PRIMARY KEY,
	nome VARCHAR (80) NOT NULL,
    especialidade VARCHAR (20) NOT NULL,
    crm VARCHAR (20) NOT NULL,
	telefone VARCHAR (80),
	email VARCHAR (80),
    status_medico BOOLEAN DEFAULT TRUE
);
ALTER TABLE Medico
ALTER COLUMN status_medico TYPE BOOLEAN
USING status_medico::BOOLEAN;

INSERT INTO medico (id_medico, nome, especialidade, telefone, crm, email) VALUES
(1, 'Dr. Clovis Basilio', 'Cardiologia', '16 99274-2016','123456-SP', 'clovisbasilio@gmail.com'),
(2, 'Dra. Elisa Sanches', 'Pediatria', '16 99350-1682','654321-RJ', 'elisasanches@gmail.com'),
(3, 'Dr. Carlos Neto', 'Ortopedia', '16 99108-5935','987687-MG', 'carlosneto@gmail.com');



CREATE TABLE Consulta (
    id_consulta SERIAL PRIMARY KEY,
	nome VARCHAR(80) NOT NULL,
    data DATE NOT NULL,
    hora VARCHAR(10) NOT NULL,
    diagnostico VARCHAR(200),
    Receita VARCHAR(200),
    Sala_atendimento VARCHAR(10) NOT NULL,
    consulta_status VARCHAR(20)NOT NULL,
    id_paciente INT NOT NULL,
    id_medico INT NOT NULL,
	status_consulta_registro BOOLEAN NOT NULL DEFAULT TRUE
);

INSERT INTO consulta (nome, data, hora, diagnostico, receita, sala_atendimento, status, id_paciente, id_medico, status_consulta_registro)
VALUES
    ('João Silva', '2025-02-15', '09:00', 'Hipertensão', 'Losartana 50mg', 101, 'Realizada', 1, 1, TRUE),
    ('Maria Oliveira', '2025-02-16', '10:30', 'Infecção de garganta', 'Amoxicilina 500mg', 202, 'Realizada', 2, 2, TRUE),
    ('Antonio Souza', '2025-02-17', '11:00', 'Dor lombar', 'Fisioterapia', 303, 'Agendada', 3, 3, TRUE);