"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const config_service_1 = require("../config/config.service");
const users_entity_1 = require("../modules/users/users.entity");
exports.databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService) => {
            const sequelize = new sequelize_typescript_1.Sequelize({
                ...configService.sequelizeOrmConfig,
                dialect: configService.sequelizeOrmConfig.dialect,
            });
            sequelize.addModels([users_entity_1.User]);
            await sequelize.sync();
            return sequelize;
        },
        inject: [config_service_1.ConfigService],
    },
];
//# sourceMappingURL=database.providers.js.map