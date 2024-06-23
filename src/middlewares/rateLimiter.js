const { response } = require("../helpers/response");
const cacheServiceWrapper = require("../services/cacheServiceWrapper");

const rateLimiter = async (req, res, next) => {
    const token = req.body.token || req.session.id;
    const getToken = await cacheServiceWrapper.get(token);

    if (req.body.token) {
        delete req.body.token;
    }
    
    if (getToken.status != 200) {
        return await cacheServiceWrapper.save(token, req.url) && next();
    }

    if (getToken.data[req.url]) {
        if (Date.now() - getToken.data[req.url] < 1000) {
            return response(res, 400, true, "Erro. Limite de requisição.");
        }
    }

    return await cacheServiceWrapper.save(token, req.url) && next();
};

module.exports = rateLimiter;