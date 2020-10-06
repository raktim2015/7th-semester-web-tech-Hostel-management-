const config = require("../common/config/env.config")
const UsersController = require("./controllers/users.controller")

const ADMIN = config.permissionLevels.ADMIN
const STUDENT = config.permissionLevels.STUDENT

exports.routesConfig = function(app) {
    app.get('./users',[
        UsersController.fetchAllUsers
    ]);
};
