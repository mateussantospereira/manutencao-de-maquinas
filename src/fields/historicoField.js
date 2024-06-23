class historicoField {
    async gravar() {
        return {
            ni: { nome: "Número de inventário", max: 16, number_text: true },
            periodo: { nome: "Período", min: 1, max: 20 },
            autor: { nome: "Autor", min: 1, max: 60 },
            turma: { nome: "Turma", min: 3, max: 30 },
            email: { nome: "E-mail", min: 1, max: 60 }
        };
    }

    async importar() {
        return {
            kilobyte: 150,
            fields: {
                'NI': { nome: "Número de inventário", max: 16, number_text: true },
                'PERÍODO': { nome: "Período", min: 1, max: 20 },
                'AUTOR': { nome: "Autor", min: 1, max: 60 },
                'TURMA': { nome: "Turma", min: 3, max: 30 },
                'E-MAIL': { nome: "E-mail", min: 1, max: 60 },
                'DATA': { nome: "Data", max: 10, date: "formatar" },
                'HORA': { nome: "Hora", max: 40, hour: true },
            }
        };
    }

    async exportar() {
        return {
            head: {
                ni: ['NI'],
                periodo: ['PERÍODO'],
                autor: ['AUTOR'],
                turma: ['TURMA'],
                email: ['E-MAIL'],
                data: ['DATA'],
                hora: ['HORA']
            }
        }
    }
}

module.exports = new historicoField();