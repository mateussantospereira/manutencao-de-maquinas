const historicoModel = require("../models/historicoModel");
const returnResponse = require("../helpers/returnResponse");
const xlsx = require("xlsx");
const fs = require("fs");

class historicoClient {
    async listar(ni) {
        const model = historicoModel.listar(ni);
        return model
            .then((historico) => {
                if (historico[0]) {
                    return returnResponse(200, false, "Histórico listado com êxito.", historico)
                } else {
                    return returnResponse(202, false, "Nenhuma gravação foi feita neste histórico no momento.")
                }
            })
            .catch(() => {
                return returnResponse(400, true, "Erro interno.")
            });
    }

    async listarPorPessoa(email, data) {
        const model = historicoModel.listarPorPessoa(email, data);
        return model
            .then((historico) => {
                if (historico[0]) {
                    return returnResponse(200, false, "Histórico listado com êxito.", historico)
                } else {
                    return returnResponse(202, false, "Nenhuma manutenção foi feita por essa pessoa.")
                }
            })
            .catch(() => {
                return returnResponse(400, true, "Erro interno.")
                
            });
    }

    async gravar(data) {
        const model = historicoModel.gravar(data);
        return model
            .then(() => {
                return returnResponse(201, false, "Dados gravados no histórico com êxito.");
            })
            .catch((error) => {
                return returnResponse(400, true, "Erro interno.")
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

    async exportar(ni, head, fileName) {
        let client = await this.listar(ni);

        if (client.status != 200) {
            return returnResponse(400, true, "Erro ao tentar exportar dados.");
        }

        let data = client.data;
        data = JSON.stringify(data);
        data = JSON.parse(data);

        try {
            const keys = Object.keys(data[0]);

            data.forEach((line) => {
                keys.forEach((key) => {
                    if (key == "data") {
                        let date = line[key].slice(0, 10).split("-");
                        line[key] = `${date[2]}/${date[1]}/${date[0]}`;
                    }

                    if (!head[key]) {
                        delete line[key];
                    } else {
                        delete Object.assign(line, { [head[key]]: line[key] })[key];
                    };
                });
            });

            const worksheet = xlsx.utils.json_to_sheet(data);
            const workbook = xlsx.utils.book_new();

            xlsx.utils.book_append_sheet(workbook, worksheet, "Patrimônios");
            await xlsx.writeFile(workbook, `./public/xlsx/export/${fileName}.xlsx`);

            const url = `/public/xlsx/export/${fileName}.xlsx`;

            return returnResponse(201, false, "Arquivo XLSX criado com êxito.", url);
        } catch (error) {
            console.log(error)
            return returnResponse(400, true, "Erro ao tentar criar arquivo XLSX.")
        }
    }
    async deletar(ni) {
        const model = historicoModel.deletar(ni);
        return model
            .then(() => {
                return returnResponse(201, false, `Histórico da máquina nº ${ni} deletado com êxito.`);
            })
            .catch((error) => {
                return returnResponse(400, true, "Erro interno.")
            });
    }
}

module.exports = new historicoClient();