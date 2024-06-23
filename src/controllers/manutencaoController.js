const { response } = require("../helpers/response");

class manutencaoController {
    async listar(req, res) {
        const periodos = {
            diario: [
                "Pré aquecer a máquina.",
                "Verificar o nível do óleo lubrificante / hidráulico.",
                "Inspecionar filtro de lubrificação.",
                "Limpar filtros (tela) do tanque de fluído refrigerante.",
                "Retirar excessos de cavacos da área de usinagem.",
                "Verificar vazamentos no sistema de lubrificação.",
                "Verificar vazamentos no sistema de refrigeração.",
                "Verificar vazamentos no sistema hidráulico.",
                "Limpar visor da porta.",
                "Engraxar placa (consulte manual da placa) (acessório).",
                "Lubrificar manga do cabeçote móvel (acessório).",
                "Inspecionar o coletor dos cilindros VNK (acessório)"
            ],

            semanal: [
                "Inspecionar raspadores de cavacos.",
                "Verificar nível e qualidade de fluido refrigerante.",
                "Inspecionar filtro e filtro regulador do sistema pneumático.",
                "Inspecionar lubrificador do sistema pneumático.",
                "Limpar o painel de operação externamente.",
                "Limpar filtros e ventiladores do painel elétrico"
            ],

            quinzenal: [
                "Inspecionar manômetros e mangueiras do sistema pneumático.",
                "Inspecionar a lubrificação e ajustar o gotejamento (se necessário) do sistema pneumático"
            ],

            mensal: [
                "Inspecionar filtro de sucção de uniddade hidráulica.",
                "Limpar tanque de refrigeração (1ª limpeza após 360 horas).",
                "Inspecionar conexões/mangueiras/válvulas/cilindros do sistema pneumático em relação a vazamentos.",
                "Limpar elementos filtrantes e os copos do filtro do sistema pneumático"
            ],

            trimestral: [
                "Substituição do elemento filtrante do filtro de linha da unidade hidráulica (2000 hs).",
                "Inspecionar e limpar área do cabeçote (correia, polias, sensores).",
                "Inspecionar tubulação e dosadores do sistema de lubrificação.",
                "Inspecionar desgaste das buchas dos mancais do cilindro (sistema pneumático)"
            ]
        };


        response(res, 200, false, "Períodos de manutenção listados..", periodos);
    }
}

module.exports = new manutencaoController();