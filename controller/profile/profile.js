class ProfileController {
    async renderProfile(req, res) {
        try{
            const authHeader = req.headers.authorization;
            const token = authHeader.split(' ')[1];


            const path = req.app.locals.services.profile.createPath('profile');
            const user = await req.app.locals.services.profile.getUserProfile(token);

            res.render(path,{ user });
        }catch(err){
            res.status(401).json({ message: err.message });
        }
        
    }
}

module.exports.profileController = new ProfileController();