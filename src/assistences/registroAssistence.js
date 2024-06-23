const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const registroField = require("../fields/registroField");

class registroAssistence {
    async createSession(req, registro) {
        const expires = new Date(Date.now() + (60 * 60 * 1000)); // 60 * 60 * 1000 = 1 hora
        let type = await this.configType(registro);

        return req.session.sess = {
            userType: type,
            path: '/', _expires: expires,
            originalMaxAge: expires,
            httpOnly: true
        };
    }

    async createToken(registro) {
        let type = await this.configType(registro);

        return jwt.sign(
            {
                session: true,
                nome: registro.nome,
                turma: registro.turma,
                email: registro.email,
                tipo: type
            },
            process.env.SECRET,
            {
                expiresIn: 3600
            } // 3600 = 1 hora
        );
    }

    async createPassword(senha) {
        return await bcrypt.hash(senha, 8);
    }

    async configType(registro) {
        let type = "aluno";

        if (registro.tipo == "Adm.") {
            type = "adm";
        }

        if (registro.tipo == "Prof.") {
            type = "prof";
        }

        return type;
    }

    async formatClass(data) {
        const {
            administrador,
            professor,
            administradores,
            professores
        } = await registroField.turmas()

        let dataTipo = data.tipo.toLocaleLowerCase();
        let dataTurma = data.turma.toLocaleLowerCase();

        if (dataTipo == administrador) {
            data.turma = "Adm.";
        }

        if (dataTipo == professor) {
            data.turma = "Profs.";
        }

        if (
            dataTipo != professor &&
            dataTipo != administrador
        ) {
            data.tipo = "Aluno";
        }

        if (
            data.tipo == "Aluno" && dataTurma == professores ||
            data.tipo == "Aluno" && dataTurma == administradores
        ) {
            data.turma = "Nula";
        }

        return data;
    }
}

module.exports = new registroAssistence;