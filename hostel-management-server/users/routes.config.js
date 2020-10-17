const UsersController = require('./controllers/users.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const STUDENT = config.permissionLevels.STUDENT;

exports.routesConfig = function (app) {
    app.post('/users', [
        UsersController.checkDuplicates,
        UsersController.insert
    ]);
    
    app.get('/users', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        UsersController.list
    ]);
    app.get('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(STUDENT),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.getById
    ]);
    app.post('/login',[
        UsersController.checkLogin
    ]);

    app.delete('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        UsersController.removeById
    ]);
    
};
