const { url } = require("../config/url");

module.exports = async (turma) => {
    const response = await fetch(`${url.local}/registro/listar-turma/${turma}`);
    const json = await response.json();

    if (json["data"]) {
        json["data"].forEach((r) => {
            r["modificacao"] = {
                href: `/modificar/${r["email"]}`,
                text: "Modificar"
            };
        });
    };

    return json;
}