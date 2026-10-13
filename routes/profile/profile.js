const express = require('express');
const profileRouter = express.Router();
const { profileController } = require('../../controller');
const { checkToeken } = require('../../middleware/checkToken');

profileRouter.get('/', checkToeken,profileController.renderProfile);

module.exports.profileRouter = profileRouter;