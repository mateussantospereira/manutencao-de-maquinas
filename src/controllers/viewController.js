const patrimonios = require("../utils/patrimoniosUtil");
const historico = require("../utils/historicoUtil");
const buscarTurmas = require("../utils/buscarTurmasUtil");
const listarTurma = require("../utils/listarTurmaUtil");
const path = require("path");
const turmas = require("../utils/turmasUtil");
const registroUtil = require("../utils/registroUtil");

const renderizar = (req, res, body) => {
    body.interface = body.interface || "main";

    if (req.session.sess) {
        body.userType = req.session.sess.userType;
    }
    
    res.render("index", { body: body });
}

class viewController {
    // ---------------------------------------------

    // Usuário

    validar(req, res) {
        renderizar(req, res, { body: 'validar', interface: "clean", out: false });
    }

    sair(req, res) {
        delete req.session.sess;
        renderizar(req, res, { body: 'validar', interface: "clean", out: true });
    }

    async registrar(req, res) {
        const json = await turmas();
        renderizar(req, res, { body: 'registrar', turmas: json });
    }

    async modificar(req, res) {
        const { email } = req.params;
        const registro = await registroUtil(email);
        const json = await turmas();
        renderizar(req, res, {
            body: 'modificar', email: email, registro: registro, turmas: json
        });
    }

    importarRegistros(req, res) {
        renderizar(req, res, { body: 'importar-registros' });
    }

    async registros(req, res) {
        const json = await buscarTurmas();
        renderizar(req, res, { body: 'registros', tabela: json });
    }

    async turma(req, res) {
        const { turma } = req.params;
        const json = await listarTurma(turma);
        renderizar(req, res, { body: 'turma', turma: turma, tabela: json });
    }

    // ---------------------------------------------

    // ---------------------------------------------

    // Patrimônios

    inicio(req, res) {
        res.redirect("/listar");
    }

    async listar(req, res) {
        const json = await patrimonios();
        renderizar(req, res, { body: 'listar', tabela: json });
    }

    escanear(req, res) {
        renderizar(req, res, { body: 'escanear' });
    }

    async imprimir(req, res) {
        const json = await patrimonios();
        renderizar(req, res, { body: 'imprimir', tabela: json });
    }

    cadastrar(req, res) {
        renderizar(req, res, { body: 'cadastrar' });
    }

    atualizar(req, res) {
        const { id } = req.params;
        renderizar(req, res, { body: 'atualizar', id: id });
    }

    importar(req, res) {
        renderizar(req, res, { body: 'importar' });
    }

    async exportar(req, res) {
        const json = await patrimonios();
        renderizar(req, res, { body: 'exportar', tabela: json });
    }

    deletar(req, res) {
        renderizar(req, res, { body: 'deletar' });
    }

    // ---------------------------------------------

    // ---------------------------------------------

    // Histórico

    async historicos(req, res) {
        const json = await patrimonios();
        renderizar(req, res, { body: 'historicos', tabela: json });
    }

    async historico(req, res) {
        const { ni } = req.params;
        const json = await historico(ni);
        renderizar(req, res, { body: 'historico', ni: ni, tabela: json });
    }

    async manutenir(req, res) {
        const { ni } = req.params;
        renderizar(req, res, { body: 'manutenir', ni: ni });
    }

    // Condições de uso

    uso(req, res) {
        renderizar(req, res, { body: 'uso', interface: "center" });
    }

    read(req, res) {
        res.sendFile(path.join(__dirname, "../../README.md"))
    }

    // ---------------------------------------------

    // ---------------------------------------------

    // Erro

    erro(req, res) {
        renderizar(req, res, { body: 'erro', interface: "clean" });
    }

    // ---------------------------------------------
}

module.exports = new viewController;