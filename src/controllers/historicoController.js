const historicoClient = require("../clients/historicoClient");
const historicoField = require("../fields/historicoField");
const historicoSupport = require("../supports/historicoSupport");
const patrimonioClient = require("../clients/patrimonioClient");
const { checkInputs } = require("../helpers/checkInputs");
const { response } = require("../helpers/response");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const xlsx = require("xlsx");
const fs = require("fs");

class historicoController {
    async listar(req, res) {
        const { ni } = req.params;
        const client = await historicoClient.listar(ni);
        return res.status(client.status).json(client);
    }

    async gravar(req, res) {
        const userToken = {
            userToken: req.body.userToken
        };
        const fields = {
            userToken: { nome: "Token de usuário", min: 1, max: 300 }
        };
        let resultInputs = checkInputs(userToken, fields);
        let reqData = resultInputs.data;

        if (resultInputs.error == true) {
            return response(res, 400, true, resultInputs.message);
        }

        const client = await patrimonioClient.buscar(reqData.ni);

        if (client.status != 200) {
            return response(res, 400, true, "Erro. Máquina não encontrada.");
        }

        let token = reqData.userToken;

        try {
            const decode = await promisify(jwt.verify)(token, process.env.SECRET);
            gravar(decode);
        } catch (error) {
            return response(res, 400, true, "Token inválido");
        }

        async function gravar(decode) {
            delete req.body.userToken;
            req.body.email = decode.email;
            req.body.autor = decode.nome;
            req.body.turma = decode.turma;

            const support = await historicoSupport.gravar(req.body);
            return res.status(support.status).json(support);
        }
    }

    async importar(req, res) {
        const fileName = `${Date.now()}${req["sessionID"]}`;
        const { ni } = req.params;
        const importarField = await historicoField.importar();
        const kilobyte = importarField.kilobyte;

        const client = await historicoClient.importar(req, kilobyte, fileName);

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
                const support = await historicoSupport.valideXLSX(temp, fields, ni);

                if (support.status != 200) {
                    return deleteFile(400, true, support.message);
                }

                return gravar(support.data);

                async function gravar(data) {
                    for (let line of data) {
                        const client = await historicoClient.gravar(line);
                        if (client.status != 201) {
                            console.log(client)
                            return deleteFile(400, true, "Erro ao gravar histórico.");
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

    async exportar(req, res) {
        const fileName = `${Date.now()}${req["sessionID"]}`;
        const { ni } = req.params;

        createXLSX(ni, head);

        async function createXLSX(ni, head) {
            const client = await historicoClient.exportar(ni, head, fileName);

            res.status(client.status).json(client);

            if (client.status == 201) {
                new Promise(() => {
                    setTimeout(() => {
                        fs.unlinkSync((`./${client.data}`));
                    }, 3000);
                });
            }
        }
    }

    async deletar(req, res) {
        const { ni } = req.params;
        const client = await historicoClient.deletar(ni);
        return res.status(client.status).json(client);
    }
}

module.exports = new historicoController();