// Validação local

const alunoSession = ((req, res, next) => {
    if (!req.session.sess) {
        return res.redirect("/validar");
    }

    return expiration(req, res, next);
});

const profSession = ((req, res, next) => {
    if (req.session.sess) {
        if (
            req.session.sess.userType == "prof" ||
            req.session.sess.userType == "adm"
        ) {
            return expiration(req, res, next);
        }
    }

    return res.redirect("/validar");
});

const admSession = ((req, res, next) => {
    if (req.session.sess) {
        if (req.session.sess.userType == "adm") {
            return expiration(req, res, next);
        }
    }

    return res.redirect("/validar");
});

const expiration = (req, res, next) => {
    const expires = (Date.parse(req.session.sess["_expires"]));
    
    if (expires < Date.now()) {
        return res.redirect("/validar");
    }

    return next();
}

module.exports = { alunoSession, profSession, admSession };