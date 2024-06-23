const { url } = require("../config/url");

module.exports = async () => {
    const response = await fetch(`${url.local}/patrimonio/listar`);
    const json = await response.json();

    if (json["data"]) {
        json["data"].forEach((p) => {
            p["manutencao"] = {
                href: `/manutenir/${p["ni"]}`,
                text: "Manutenir"
            };

            p["atualizacao"] = {
                href: `/atualizar/${p["ni"]}`,
                text: "Atualizar"
            };

            p["historico"] = {
                href: `/historico/${p["ni"]}`,
                text: "Informações"
            };
        });
    }

    return json;
}