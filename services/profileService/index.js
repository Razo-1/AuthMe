require('dotenv').config();
const { Config } = require('../config');
const jwt = require('jsonwebtoken');

class ProfileService extends Config {
    constructor(model) {
        super();
        this.model = model;
    }

    async getUserProfile(token) {
        try {

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await this.model.user.findById(decoded.id).select('-password');

            if (!user) {
                throw new Error('User not found');
            }
            
            return user;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports.ProfileService = ProfileService;
