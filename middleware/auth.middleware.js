const jwt = require('jsonwebtoken')
/**
 * verifies user's jwt token stored in browser cookies
 * @param {*} req { cookies.jwt }
 * @param {*} res { status(), json() }
 * @param {*} next next()
 * @returns 
 */
module.exports.studentOnly = (req, res, next) => {
    console.log('middlware');
    let token = req.cookies.USER_TOKEN
    console.log(token);
    if (token) {
        let decoded = jwt.verify(token, 'w')
        if (decoded) {
            if (decoded.userType === 'student') {
                req.userEmail = decoded.email
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
    console.log(token);
    if (token) {
        let decoded = jwt.verify(token, 'w')
        if (decoded) {
            if (decoded.userType === 'lecturer') {
                req.userEmail = decoded.email
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
module.exports.loggedIn = (req, res, next) => {
    let token = req.cookies.USER_TOKEN
    console.log(token);
    if (token) {
        let decoded = jwt.verify(token, 'w')
        if (decoded) {
            if (decoded.userType === 'lecturer' || decoded.userType === 'student') {
                req.userEmail = decoded.email
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