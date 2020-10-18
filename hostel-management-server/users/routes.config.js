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
    
    app.get('/user', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(STUDENT),
        UsersController.getById
    ]);

    app.patch('/user',[
        ValidationMiddleware.validJWTNeeded,
        UsersController.patchById

    ]);

    app.delete('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        UsersController.removeById
    ]);
    
};
