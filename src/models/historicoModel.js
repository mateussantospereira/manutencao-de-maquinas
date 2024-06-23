const executeQuery = require("../helpers/executeQuery");

class historicoModel {
    async listar(ni) {
        const sql = "SELECT * FROM historicos WHERE ni = ?";
        return await executeQuery(sql, ni);
    }

    async listarPorPessoa(email, data) {
        const sql = "SELECT data FROM historicos WHERE email = ? and data = ?";
        return await executeQuery(sql, [email, data]);
    }

    async gravar(data) {
        const sql = "INSERT INTO historicos SET ?";
        return await executeQuery(sql, data);
    }

    async deletar(ni) {
        const sql = "DELETE FROM historicos WHERE ni = ?";
        return await executeQuery(sql, ni);
    }
}

module.exports = new historicoModel();