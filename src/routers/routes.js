const { Router } = require("express");
const registroController = require("../controllers/registroController");
const patrimonioController = require("../controllers/patrimonioController");
const historicoController = require("../controllers/historicoController");
const manutencaoController = require("../controllers/manutencaoController");
const viewController = require("../controllers/viewController")
const rateLimiter = require("../middlewares/rateLimiter");
const { alunoSession, profSession, admSession } = require("../middlewares/valideSession");
const { aluno, prof, adm } = require("../middlewares/valide");
const { resolver } = require("../middlewares/error");
const router = Router();

// Páginas EJS

// Usuário
router.get("/", alunoSession, viewController.inicio);
router.get("/sair", alunoSession, viewController.sair);
router.get("/validar", resolver(viewController.validar));
router.get("/registrar", admSession, resolver(viewController.registrar));
router.get("/importar-registros", admSession, resolver(viewController.importarRegistros));
router.get("/registros", admSession, resolver(viewController.registros));
router.get("/turma/:turma", adm, resolver(viewController.turma));
router.get("/modificar/:email", admSession, resolver(viewController.modificar));

// Patrimônios
router.get("/listar", alunoSession, resolver(viewController.listar));
router.get("/escanear", alunoSession, resolver(viewController.escanear));
router.get("/imprimir", profSession, resolver(viewController.imprimir));
router.get("/cadastrar", admSession, resolver(viewController.cadastrar));
router.get("/importar", admSession, resolver(viewController.importar));
router.get("/exportar", profSession, resolver(viewController.exportar));
router.get("/deletar", admSession, resolver(viewController.deletar));
router.get("/atualizar/:id", admSession, resolver(viewController.atualizar));

// Histórico
router.get("/historicos", profSession, resolver(viewController.historicos));
router.get("/historico/:ni", profSession, resolver(viewController.historico));
router.get("/manutenir/:ni", alunoSession, resolver(viewController.manutenir));

// Condições de uso
router.get("/uso", resolver(viewController.uso));

// ReadME.md

router.get("/read", resolver(viewController.read));

// Registro Controller

router.get("/registro/listar", registroController.listar);
router.get("/registro/listar-turma/:turma", registroController.listarTurma);
router.get("/registro/turmas", registroController.turmas);
router.get("/registro/buscar-turmas", registroController.buscarTurmas);
router.get("/registro/buscar/:email", registroController.buscar);
router.post("/registro/validar", registroController.validar);
router.post("/registro/criar", adm, registroController.criar);
router.post("/registro/importar", adm, registroController.importar);
router.put("/registro/atualizar/:email", adm, rateLimiter, registroController.atualizar);
router.delete("/registro/deletar/:email", adm, rateLimiter, registroController.deletar);
router.delete("/registro/deletar-turma/:turma", adm, rateLimiter, registroController.deletarTurma);

// Patrimônio Controller

router.get("/patrimonio/listar", patrimonioController.listar);
router.get("/patrimonio/buscar/:id", patrimonioController.buscar);
router.post("/patrimonio/criar", adm, rateLimiter, patrimonioController.criar);
router.post("/patrimonio/importar", adm, rateLimiter, patrimonioController.importar);
router.post("/patrimonio/exportar", prof, rateLimiter, patrimonioController.exportar);
router.post("/patrimonio/imprimir", prof, rateLimiter, patrimonioController.imprimir);
router.put("/patrimonio/atualizar/:id", adm, rateLimiter, patrimonioController.atualizar);
router.delete("/patrimonio/deletar/:id", adm, rateLimiter, patrimonioController.deletar);
router.delete("/patrimonio/truncar", adm, rateLimiter, patrimonioController.truncar);

// Histórico Controller

router.get("/historico/listar/:ni", historicoController.listar);
router.post("/historico/gravar", aluno, rateLimiter, historicoController.gravar);
router.post("/historico/importar/:ni", adm, rateLimiter, historicoController.importar);
router.post("/historico/exportar/:ni", prof, rateLimiter, historicoController.exportar);
router.delete("/historico/deletar/:ni", adm, rateLimiter, historicoController.deletar);

// Manutenção Controller

router.get("/manutencao/listar", manutencaoController.listar);

module.exports = router;