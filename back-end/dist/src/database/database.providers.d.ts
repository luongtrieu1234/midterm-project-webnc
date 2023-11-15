import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '../config/config.service';
export declare const databaseProviders: {
    provide: string;
    useFactory: (configService: ConfigService) => Promise<Sequelize>;
    inject: (typeof ConfigService)[];
}[];
