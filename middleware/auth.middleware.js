const jwt = require('jsonwebtoken')
/**
 * verifies user's jwt token stored in browser cookies
 * @param {*} req { cookies.jwt }
 * @param {*} res { status(), json() }
 * @param {*} next next()
 * @returns 
 */
module.exports.studentOnly = (req, res, next) => {
    let token = req.cookies.USER_TOKEN
    if (token) {
        let decoded = jwt.verify(token, 'w')
        if (decoded) {
            if (decoded.role === 'student') {
                req.user = decoded;
                next()
            }
        } else {
            return res.redirect('/auth/login');
            // return res.status(401).json({error: 'token invalid. Please Login'})
        }
    }
    else {
        return res.redirect('/auth/login');
        // res.status(401).json({error: 'token not found. Please Login'})
    }
}
module.exports.lecturerOnly = (req, res, next) => {
    let token = req.cookies.USER_TOKEN
    if (token) {
        let decoded = jwt.verify(token, 'w')
        if (decoded) {
            if (decoded.role === 'lecturer') {
                req.user = decoded;
                next()
            }
        } else {
            return res.redirect('/auth/login');
            // return res.status(401).json({error: 'token invalid. Please Login'})
        }
    }
    else {
        return res.redirect('/auth/login');
        // res.status(401).json({error: 'token not found. Please Login'})
    }
}
module.exports.lecturerAdminOnly = (req, res, next) => {
    let token = req.cookies.USER_TOKEN
    if (token) {
        let decoded = jwt.verify(token, 'w')
        if (decoded) {
            if (decoded.role === 'lecturer' || decoded.role === 'admin') {
                req.user = decoded
                next()
            }
        } else {
            return res.redirect('/auth/login');
            // return res.status(401).json({error: 'token invalid. Please Login'})
        }
    }
    else {
        return res.redirect('/auth/login');
        // res.status(401).json({error: 'token not found. Please Login'})
    }
}
module.exports.adminOnly = (req, res, next) => {
    let token = req.cookies.USER_TOKEN
    if (token) {
        let decoded = jwt.verify(token, 'w')
        if (decoded) {
            if (decoded.role === 'admin') {
                req.user = decoded
                next()
            }
        } else {
            return res.redirect('/auth/admin/login/');
            // return res.status(401).json({error: 'token invalid. Please Login'})
        }
    }
    else {
        return res.redirect('/auth/admin/login/');
        // res.status(401).json({error: 'token not found. Please Login'})
    }
}
module.exports.loggedIn = (req, res, next) => {
    let token = req.cookies.USER_TOKEN
    if (token) {
        let decoded = jwt.verify(token, 'w')
        if (decoded) {
            if (decoded.role === 'lecturer' || decoded.role === 'student' || decoded.role === 'admin') {
                req.user = decoded
                next()
            }
        } else {
            return res.redirect('/auth/login');
            // return res.status(401).json({error: 'token invalid. Please Login'})
        }
    }
    else {
        return res.redirect('/auth/login');
        // res.status(401).json({error: 'token not found. Please Login'})
    }
}
module.exports.NoAuthentication = (req, res, next) => {
    let token = req.cookies.USER_TOKEN;
    if (token) {
        let decoded = jwt.verify(token, 'w')
        if (decoded) {
            req.user = decoded
        }
    }
    next()
}