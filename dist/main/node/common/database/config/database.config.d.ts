import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
export declare class DatabaseConfig implements MongooseOptionsFactory {
    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions>;
}
