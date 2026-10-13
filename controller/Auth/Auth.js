const registerSchema = require('../../schem/registerSchem');
const loginSchema = require('../../schem/loginSchem');

class AuthController {
    async renderRegister(req, res) {
        const path = req.app.locals.services.auth.createPath('index');
        res.render(path);
    }

    async registerUser(req, res) {
        try {

            const token = await req.app.locals.services.auth.registerUser(req.body);
            res.json(token);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async loginUser(req, res) {
        try {
            const token = await req.app.locals.services.auth.loginUser(req.body);
            res.json(token);
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

    async authMe(req, res) {

        const authHeader = req.headers.authorization;

        const token = authHeader.split(' ')[1];
        const user = await req.app.locals.services.auth.authMe(token);

        res.json(user);
    }

    async renderLogin(req, res) {
        const path = req.app.locals.services.auth.createPath('login');
        res.render(path);
    }

    async renderProfile(req, res) {
        const path = req.app.locals.services.auth.createPath('profile');
        res.render(path);
    }

    async login(req, res) {
        const token = await req.app.locals.services.auth.loginUser(req.body);
        res.json(token);
    }

    async logoutUser(req, res) {
        
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const user = await req.app.locals.services.auth.logoutUser(token);

        res.json(user);
    }
}

module.exports.authController = new AuthController();
