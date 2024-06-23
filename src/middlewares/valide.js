const { alunoSession, profSession, admSession } = require("./valideSession");
const { checkInputs } = require("../helpers/checkInputs");
const { response } = require("../helpers/response");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

// Validação local e externa

const aluno = ((req, res, next) => {
    if (req.body.token) {
        return verificarToken(req, res, next);
    }

    return alunoSession(req, res, next);
});

const prof = ((req, res, next) => {
    if (req.body.token) {
        return verificarToken(req, res, next, "prof");
    }
    
    return profSession(req, res, next);
});

const adm = ((req, res, next) => {
    if (req.body.token) {
        return verificarToken(req, res, next, "adm");
    }
    
    return admSession(req, res, next);
});

const verificarToken = async (req, res, next, type = "aluno") => {
    const fields = { token: { nome: "Token", max: 300 } };

    let resultInputs = checkInputs({ token: req.body.token }, fields);

    if (resultInputs.error == true) {
        response(res, 400, true, resultInputs.message);
        return;
    }

    let token = resultInputs.data.token;

    try {
        const decode = await promisify(jwt.verify)(token, process.env.SECRET);

        if (decode.tipo == "adm") {
            return next();
        }

        if (type == "prof" && decode.tipo == "prof") {
            return next();
        }
        
        if (
            type == "aluno" && decode.tipo == "aluno" ||
            type == "aluno" && decode.tipo == "prof"
        ) {
            return next();
        }

        return response(res, 400, true, "Acesso não autorizado.");

    } catch (error) {
        return response(res, 400, true, "Token inválido");
    }
};

module.exports = { aluno, prof, adm };