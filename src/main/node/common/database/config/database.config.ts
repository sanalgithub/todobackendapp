import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class DatabaseConfig implements MongooseOptionsFactory {
  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {
    console.log(process.env.DB_URL);
    const uri = process.env.DB_URL;
    if (!uri) {
      throw new Error('MongoDB connection string is not defined');
    }

    return {
      uri,
      auth: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
      },
      dbName: process.env.DB_DATABASE_NAME,
    };
  }
}
