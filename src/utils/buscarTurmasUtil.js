const { url } = require("../config/url");

module.exports = async () => {
    const response = await fetch(`${url.local}/registro/buscar-turmas`);
    const json = await response.json();

    if (json["data"]) {
        json.data.forEach((line) => {
            line["visualizacao"] = {
                href: `/turma/${line["turma"]}`,
                text: "Visualizar"
            };
        });
    }

    return json;
}