const registroClient = require("../clients/registroClient");
const registroAssistence = require("../assistences/registroAssistence");
const returnResponse = require("../helpers/returnResponse");
const registroField = require("../fields/registroField");
const { checkInputs } = require("../helpers/checkInputs");
const bcrypt = require("bcryptjs");

class registroSupport {
    async validar(data) {
        const client = await registroClient.comparar(data.email);

        if (client.status != 200) {
            return returnResponse(400, true, "Erro. E-mail ou senha incorretos.");
        }

        const registro = client.data[0];

        if ((await bcrypt.compare(data.senha, registro.senha))) {
            return returnResponse(200, false, "Validação concluída com êxito.", registro);
        } else {
            return returnResponse(400, true, "Erro. E-mail ou senha incorretos.");
        }
    }

    async criar(data) {
        const fields = await registroField.criar();
        let resultInputs = checkInputs(data, fields);
        let reqData = resultInputs.data;

        if (resultInputs.error == true) {
            return returnResponse(400, true, resultInputs.message);
        }

        reqData.senha = await registroAssistence.createPassword(reqData.senha);
        return buscar(reqData.email);

        async function buscar(email) {
            const client = await registroClient.comparar(email);

            if (client.status == 200) {
                return returnResponse(400, true, "Erro. Este E-mail já está em uso.");
            }

            return criar(reqData);
        }

        async function criar(data) {
            data = await registroAssistence.formatClass(data);
            const response = await registroClient.criar(data);
            return response;
        }
    }

    async valideXLSX(body, fields) {
        let list = [];
        let listaEmail = [];

        function error(message) {
            return returnResponse(400, true, message);
        }

        for (let line of body) {
            let resultInputs = checkInputs(line, fields);
            let reqData = resultInputs.data;

            if (resultInputs.error == true) {
                return error(resultInputs.message);
            }

            if (listaEmail.includes(reqData['E-MAIL'])) {
                return error("Erro. Este arquivo possuí E-mails repetidos.");
            }

            const client = await registroClient.comparar(reqData['E-MAIL']);

            if (client.status == 200) {
                return error("Erro. O arquivo possuí E-mails já existentes no banco de dados.");
            }

            listaEmail.push(reqData['E-MAIL']);

            let newData = {
                nome: reqData['NOME'],
                email: reqData['E-MAIL'],
                senha: reqData['SENHA'],
                turma: reqData['TURMA'],
                tipo: reqData['TIPO']
            };

            newData = await registroAssistence.formatClass(newData);

            list.push(newData);
        }

        return returnResponse(200, false, "Arquivo validado.", list);
    }
}

module.exports = new registroSupport;