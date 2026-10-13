const { Config } = require('../config');
const jwt = require('jsonwebtoken');

class AuthService extends Config {
    constructor(model) {
        super();
        this.model = model;
    }

    async registerUser(body) {
        try{
            const existingUser = await this.model.user.findOne({ email: body.email });

            if (existingUser) {
                throw new Error('User with this email already exists');
            }

            const doc = new this.model.user(body);
            await doc.save();

            const token = jwt.sign({ id: doc._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

            return { token };
        }catch(err){
            throw new Error(err.message);
        }
    }

    async authMe(token) {
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (!decoded) {
                throw new Error('Invalid token');
            }

            const user = await this.model.user.findById(decoded.id).select('-password');

            return user;
            
        }catch(err){
            throw new Error(err.message);
        }
    }

    async loginUser(body) {
        const user = await this.model.user.findOne({
            email: body.email,
            password: body.password
        });

        if (!user) {
            throw new Error('Invalid email or password');
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        return { token };
    }

    async loginUser(body){
        const user = await this.model.user.findOne({email : body.email})

        if(!user){
            throw new Error('Invalid email or password');
        }

        if(user.password !== body.password){
            throw new Error('Invalid email or password');
        }

        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn : '7d'});
        return { token };
    }

    async logoutUser(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if(!decoded){
                throw new Error('Invalid token');
            }
            
            return { message: 'Logged out successfully', ok: true };
        }catch(err){
            throw new Error(err.message);
        }
    }
}

module.exports.AuthService = AuthService;
