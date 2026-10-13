const { registerSchema } = require('../../schem');

const authentication = async (req, res, next) => {

    const { name, email, password } = req.body;

    const { error } = registerSchema.validate({ name, email, password });

    if(error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
}

module.exports.authentication = authentication;