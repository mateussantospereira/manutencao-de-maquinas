const registroModel = require("../models/registroModel");
const returnResponse = require("../helpers/returnResponse");
const fs = require("fs");

class registroClient {
    async listar() {
        const model = registroModel.listar();
        return model
            .then((registros) => {
                if (registros[0]) {
                    return returnResponse(200, false, "Registros listados com êxito.", registros);
                } else {
                    return returnResponse(202, false, "Nenhum registro existente.");
                }
            })
            .catch(() => { return returnResponse(400, true, "Erro interno.") });
    }

    async listarTurma(turma) {
        const model = registroModel.listarTurma(turma);
        return model
            .then((turmas) => {
                if (turmas[0]) {
                    return returnResponse(200, false, "Turma listada com êxito.", turmas);
                } else {
                    return returnResponse(202, false, "Turma inexistente.");
                }
            })
            .catch(() => { return returnResponse(400, true, "Erro interno.") });
    }

    async turmas() {
        const model = registroModel.turmas();
        return model
            .then((turmas) => {
                return returnResponse(200, false, "Turmas listadas com êxito.", turmas);
            })
            .catch(() => { return returnResponse(400, true, "Erro interno.") });
    }

    async buscarTurmas() {
        const model = registroModel.buscarTurmas();
        return model
            .then((turmas) => {
                return returnResponse(200, false, "Turmas listadas com êxito.", turmas);
            })
            .catch(() => { return returnResponse(400, true, "Erro interno.") });
    }

    async buscar(email) {
        const model = registroModel.buscar(email);
        return model
            .then((registro) => {
                if (registro[0]) {
                    return returnResponse(200, false, "Registro buscado com êxito.", registro);
                } else {
                    return returnResponse(404, true, "Registro inexistente.");
                }
            })
            .catch(() => { return returnResponse(400, true, "Erro interno.") });
    }

    async comparar(email) {
        const model = registroModel.comparar(email);
        return model
            .then((registro) => {
                if (registro[0]) {
                    return returnResponse(200, false, "Registro buscado com êxito.", registro);
                } else {
                    return returnResponse(404, true, "Registro inexistente.");
                }
            })
            .catch(() => { return returnResponse(400, true, "Erro interno.") });
    }

    async criar(data) {
        const model = registroModel.criar(data);
        return model
            .then(() => {
                return returnResponse(201, false, "Agente registrado com sucesso.");
            })
            .catch(() => {
                return returnResponse(400, true, "Erro interno.");
            });
    }

    async importar(req, limit, fileName) {
        let data = [];
        const kilobyte = limit;
        const byte = kilobyte * 1000;
        const file = fs.createWriteStream(`./public/xlsx/import/${fileName}`);

        return new Promise((resolve) => {
            req.on("data", chunk => {
                data.push(chunk);
            });
            req.on("end", () => {
                data = Buffer.concat(data);

                if (data.length > byte) {
                    file.end();
                    return resolve(returnResponse(400, true,
                        `Erro. Este arquivo supera o limite de tamanho (${kilobyte} KB).`));
                }

                file.write(data);
                file.end("end", (error) => {
                    if (error) {
                        return resolve(returnResponse(400, true,
                            "Erro ao criar arquivo XLSX."));
                    }

                    return resolve(returnResponse(201, false,
                        "Arquivo XLSX criado com êxito."));
                });
            });
        });
    }

    async atualizar(data, email) {
        const atualizado = data;
        const model = registroModel.atualizar(atualizado, email);
        return model
            .then(() => {
                return returnResponse(200, false, "Registro modificado com êxito.");
            })
            .catch(() => {
                return returnResponse(400, true, "Erro interno.");
            });
    }

    async deletar(email) {        
        const model = registroModel.deletar(email);
        return model
            .then(() => {
                return returnResponse(200, false, "Registro deletado com êxito.");
            })
            .catch(() => {
                return returnResponse(400, true, "Erro interno.");
            });
    }

    async deletarTurma(turma) {        
        const model = registroModel.deletarTurma(turma);
        return model
            .then(() => {
                return returnResponse(200, false, "Turma deletada com êxito.");
            })
            .catch(() => {
                return returnResponse(400, true, "Erro interno.");
            });
    }
}

module.exports = new registroClient;