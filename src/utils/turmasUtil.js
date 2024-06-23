const { url } = require("../config/url");

module.exports = async () => {
    const response = await fetch(`${url.local}/registro/buscar-turmas`);
    const json = await response.json();

    return json;
}