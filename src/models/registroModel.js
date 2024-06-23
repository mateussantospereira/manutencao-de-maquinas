const executeQuery = require("../helpers/executeQuery");

class RegistroModel {
    async listar() {
        const sql = "SELECT * FROM registros";
        return await executeQuery(sql);
    }

    async listarTurma(turma) {
        const sql = "SELECT * FROM registros WHERE turma = ?";
        return await executeQuery(sql, turma);
    }

    async turmas() {
        const sql = "SELECT DISTINCT turma FROM registros";
        return await executeQuery(sql);
    }

    async buscarTurmas() {
        const sql = "SELECT turma, count(*) FROM registros GROUP BY turma";
        return await executeQuery(sql);
    }

    async buscar(email) {
        const sql = "SELECT nome, tipo, turma, email FROM registros WHERE email = ?";
        return await executeQuery(sql, email);
    }

    async comparar(email) {
        const sql = "SELECT * FROM registros WHERE email = ?";
        return await executeQuery(sql, email);
    }

    async criar(registro) {
        const sql = "INSERT INTO registros SET ?";
        return await executeQuery(sql, registro);
    }

    async atualizar(atualizado, email) {    
        const sql = "UPDATE registros SET ? WHERE email = ?";
        return await executeQuery(sql, [atualizado, email]);
    }

    async deletar(email) {
        const sql = "DELETE FROM registros WHERE email = ?";
        return await executeQuery(sql, email);
    }

    async deletarTurma(turma) {
        const sql = "DELETE FROM registros WHERE turma = ?";
        return await executeQuery(sql, turma);
    }
}

module.exports = new RegistroModel();