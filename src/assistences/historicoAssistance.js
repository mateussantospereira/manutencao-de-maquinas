class historicoAssistance {
    async getDate() {
        const dateNow = new Date();
        const options = {
            timeZone: 'America/Sao_Paulo',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        };
        const dataBrasil = dateNow.toLocaleString('pt-BR', options);

        let date = dataBrasil.split(", ");
        let day = date[0].split("/");
        day = `${day[2]}-${day[1]}-${day[0]}`;
        let hour = date[1];

        return {
            day: day,
            hour: hour
        };
    }
}

module.exports = new historicoAssistance();