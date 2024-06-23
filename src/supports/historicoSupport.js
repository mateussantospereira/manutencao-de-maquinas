const historicoClient = require("../clients/historicoClient");
const patrimonioClient = require("../clients/patrimonioClient");
const registroClient = require("../clients/registroClient");
const historicoField = require("../fields/historicoField");
const historicoAssistance = require("../assistences/historicoAssistance");
const returnResponse = require("../helpers/returnResponse");
const { checkInputs } = require("../helpers/checkInputs");

class historicoSupport {
    async gravar(body) {
        const fields = await historicoField.gravar();
        let resultInputs = checkInputs(body, fields);
        let reqData = resultInputs.data;

        if (resultInputs.error == true) {
            return returnResponse(400, true, resultInputs.message);
        } else {
            return buscar(reqData.email);
        }

        async function buscar(email) {
            const client = await registroClient.buscar(email);

            if (client.status != 200) {
                return client;
            }

            return validateDate(email);
        }

        async function validateDate(email) {
            const date = await historicoAssistance.getDate();
            const client = await historicoClient.listarPorPessoa(email, date.day);

            if (client.status != 202) {
                return returnResponse(400, true, "Manutenção já concluída hoje.");
            }

            reqData.data = date.day;
            reqData.hora = date.hour;

            return gravar(reqData);
        }

        async function gravar(data) {
            const client = await historicoClient.gravar(data);
            return client;
        }
    }

    async valideXLSX(body, fields, ni) {
        let list = [];

        function error(message) {
            return returnResponse(400, true, message);
        }

        const client = await patrimonioClient.buscar(ni);

        if (client.status != 200) {
            return error("Erro. O arquivo não possuí o número de inventário de uma máquina existente.");
        }

        for (let line of body) {
            let resultInputs = checkInputs(line, fields);
            let reqData = resultInputs.data;

            if (resultInputs.error == true) {
                return error(resultInputs.message);
            }

            if (reqData['NI'] != ni) {
                return error("Erro. O número de inventário do arquivo não é o mesmo da máquina.");
            }

            const newData = {
                ni: reqData['NI'],
                periodo: reqData['PERÍODO'],
                autor: reqData['AUTOR'],
                turma: reqData['TURMA'],
                email: reqData['E-MAIL'],
                data: reqData['DATA'],
                hora: reqData['HORA']
            };

            list.push(newData);
        }

        return returnResponse(200, false, "Arquivo validado.", list);
    }
}

module.exports = new historicoSupport();