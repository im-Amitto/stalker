import validator from 'validator';

const validateUsername = (req, res, next) => {
    let username = req.body.username;
    if (!username) {
        res.status(400).send({ message: "Failed! Required fields are empty!" })
        return
    }
    if (!validator.isLength(username, { min: 4, max: 12 })) {
        res.status(400).send({ message: "Failed! Username needs to be between 4 to 12 characters!" })
        return
    }
    next()
};

const validateEmail = (req, res, next) => {
    let email = req.body.email;
    if (!email) {
        res.status(400).send({ message: "Failed! Required fields are empty!" })
        return
    }
    if (!validator.isEmail(email)) {
        res.status(400).send({ message: "Failed! E-mail is invalid!" })
        return
    }
    next()
};

const validatePassword = (req, res, next) => {
    let password = req.body.password;
    if (!password) {
        res.status(400).send({ message: "Failed! Required fields are empty!" })
        return
    }
    if (!validator.isLength(password, { min: 4, max: 12 })) {
        res.status(400).send({ message: "Failed! Password needs to be between 4 to 12 characters!" })
        return
    }
    next()
};

export {
    validateUsername,
    validateEmail,
    validatePassword
}