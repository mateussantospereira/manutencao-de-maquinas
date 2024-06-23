class registroField {
    async validar() {
        return {
            email: { nome: "E-mail", max: 60 },
            senha: { nome: "Senha", max: 20 }
        };
    }

    async criar() {
        return {
            nome: { nome: "Nome", min: 10, max: 60, ndc: ["especiais", "numeros"] },
            email: { nome: "E-mail", min: 12, max: 60, obg: ["@", "."], ndc: ["especiais"] },
            senha: { nome: "Senha", min: 5, max: 20 },
            turma: { nome: "Turma", min: 3, max: 30 },
            tipo: { nome: "Tipo", min: 3, max: 25 }
        };
    }

    async atualizar() {
        return {
            nome: { nome: "Nome", min: 10, max: 60, ndc: ["especiais", "numeros"] },
            turma: { nome: "Turma", min: 1, max: 30 },
            email: { nome: "E-mail", min: 12, max: 60, obg: ["@", "."], ndc: ["especiais"] },
            senha: { nome: "Senha", max: 20 },
            novaSenha: { nome: "Nova senha", min: 5, max: 20, null: true }
        };
    }

    async importar() {
        return {
            kilobyte: 150,
            fields: {
                'NOME': { nome: "Nome", min: 10, max: 60, ndc: ["especiais", "numeros"] },
                'E-MAIL': { nome: "E-mail", min: 12, max: 60, obg: ["@", "."], ndc: ["especiais"] },
                'SENHA': { nome: "Senha", min: 5, max: 20 },
                'TURMA': { nome: "Turma", min: 3, max: 30 },
                'TIPO': { nome: "Tipo", min: 3, max: 25 }
            }
        };
    }

    async turmas() {
        let administrador = "adm.".toLocaleLowerCase();
        let professor = "prof.".toLocaleLowerCase();
        let administradores = "Adm.".toLocaleLowerCase();
        let professores = "Profs.".toLocaleLowerCase();

        return {
            administrador,
            professor,
            administradores,
            professores
        };
    }
}

module.exports = new registroField;