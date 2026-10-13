const { loginSchema } = require('../../schem');

const loginAuthication = (req, res, next) => {
    const { email, password } = req.body;

    const { error } = loginSchema.validate({ email, password });

    if(error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
}

module.exports.loginAuthication = loginAuthication;