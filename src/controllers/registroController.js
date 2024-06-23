const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const { response } = require("../helpers/response");
const { checkInputs } = require("../helpers/checkInputs");
const registroClient = require("../clients/registroClient");
const registroField = require("../fields/registroField");
const registroSupport = require("../supports/registroSupport");
const registroAssistence = require("../assistences/registroAssistence");
const xlsx = require("xlsx");
const fs = require("fs");

class registroController {
    async listar(req, res) {
        const response = await registroClient.listar();
        return res.status(response.status).json(response);
    }

    async listarTurma(req, res) {
        const { turma } = req.params;
        const response = await registroClient.listarTurma(turma);
        return res.status(response.status).json(response);
    }

    async turmas(req, res) {
        const response = await registroClient.turmas();
        return res.status(response.status).json(response);
    }

    async buscarTurmas(req, res) {
        const response = await registroClient.buscarTurmas();
        return res.status(response.status).json(response);
    }

    async buscar(req, res) {
        const { email } = req.params;
        const response = await registroClient.buscar(email);
        return res.status(response.status).json(response);
    }

    async validar(req, res) {
        const fields = await registroField.validar();
        let resultInputs = checkInputs(req.body, fields);
        let reqData = resultInputs.data;

        if (resultInputs.error == true) {
            return response(res, 400, true, resultInputs.message);
        }

        return validar(reqData);

        async function validar(data) {
            const support = await registroSupport.validar(data);

            if (support.status != 200) {
                return res.status(support.status).json(support);
            }

            await registroAssistence.createSession(req, support.data);
            const token = await registroAssistence.createToken(support.data);

            support.data = {
                nome: support.data.nome,
                email: support.data.email,
                token: token
            };

            return res.status(support.status).json(support);
        }
    }

    async verificar(req, res) {
        const token = req.body.token;

        try {
            const decode = await promisify(jwt.verify)(token, process.env.SECRET);
            response(res, 200, false, "Token válido", decode);
        } catch (error) {
            response(res, 400, true, "Token inválido");
        }
    }

    async criar(req, res) {
        const support = await registroSupport.criar(req.body);
        return res.status(support.status).json(support);
    }

    async importar(req, res) {
        const fileName = `${Date.now()}${req["sessionID"]}`;
        const importarField = await registroField.importar();
        const kilobyte = importarField.kilobyte;

        const client = await registroClient.importar(req, kilobyte, fileName);

        if (client.status != 201) {
            return deleteFile(400, true, client.message);
        }

        return await readXLSX();

        function deleteFile(status, error, message) {
            fs.unlinkSync(`./public/xlsx/import/${fileName}`);
            return response(res, status, error, message);
        }

        async function readXLSX() {
            async function readFile() {
                const file = xlsx.readFile(`./public/xlsx/import/${fileName}`);
                const temp = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);
                const fields = importarField.fields;
                const support = await registroSupport.valideXLSX(temp, fields);

                if (support.status != 200) {
                    return deleteFile(400, true, support.message);
                }

                return registrar(support.data);

                async function registrar(data) {
                    for (let line of data) {
                        const registro = await registroSupport.criar(line);
                        if (registro.status != 201) {
                            return deleteFile(400, true, "Erro ao cadastrar lista de registros.");
                        }
                    }

                    return deleteFile(201, false, "Importação concluída com êxito.");
                }
            }

            try {
                return await readFile();
            } catch (error) {
                console.log(error)
                return deleteFile(
                    400, true, "Erro ao ler arquivo. Envie um arquivo XLSX válido.");
            }
        }
    }

    async atualizar(req, res) {
        if (!req.body.novaSenha) {
            req.body.novaSenha = "";
        }

        const { email } = req.params;
        const fields = await registroField.atualizar();
        let resultInputs = checkInputs(req.body, fields);
        let reqData = resultInputs.data;

        if (resultInputs.error == true) {
            return response(res, 400, true, resultInputs.message);
        }

        const data = { email: email, senha: reqData.senha };
        const support = await registroSupport.validar(data);

        if (support.status != 200) {
            return res.status(support.status).json(support);
        }

        return atualizar(reqData);

        async function atualizar(registro) {
            if (registro.email != email) {
                const client = await registroClient.buscar(reqData.email);
                if (client.status == 200) {
                    return response(res, 400, true, "Erro. Este E-mail já está sendo ultilizado.");
                }
                return modificar();
            }
            return modificar();
        };

        async function modificar() {
            if (reqData.novaSenha != "") {
                reqData.senha = reqData.novaSenha;
            };

            reqData.senha = await registroAssistence.createPassword(reqData.senha);
            delete reqData.novaSenha;

            const client = await registroClient.atualizar(reqData, email);
            return res.status(client.status).json(client);
        };
    }

    async deletar(req, res) {
        const { email } = req.params;
        const client = await registroClient.deletar(email);
        return res.status(client.status).json(client);
    }

    async deletarTurma(req, res) {
        const { turma } = req.params;
        const client = await registroClient.deletarTurma(turma);
        return res.status(client.status).json(client);
    }

}

module.exports = new registroController;