import { DynamicModule, Module, Type } from '@nestjs/common';
import { DatabaseConfig } from '@app/common/database/config/database.config';
import {
  ModelDefinition,
  MongooseModule,
  SchemaFactory,
} from '@nestjs/mongoose';
import { BaseModel } from '@app/common/database/model/base.model';
import mongoose, { ToObjectOptions } from 'mongoose';
import { plainToClass } from 'class-transformer';
import { ModelUtils } from '@app/common/database/utils/models.utils';

@Module({
  providers: [DatabaseConfig],
})
export class DataBaseModule {
  static async forRoot(): Promise<DynamicModule> {
    return {
      module: DataBaseModule,
      imports: [MongooseModule.forRootAsync({ useClass: DatabaseConfig })],
    };
  }

  static async forFeature<T extends BaseModel>(
    ...entities: Type<T>[]
  ): Promise<DynamicModule> {
    const defenitions = DataBaseModule.getModelDefinitions(...entities);
    const module = MongooseModule.forFeature(defenitions);
    return {
      module: DataBaseModule,
      imports: [module],
      exports: [module],
    };
  }

  private static getModelDefinitions<T>(
    ...entities: Type<any>[]
  ): ModelDefinition[] {
    return entities.map((entity) => {
      const schema = SchemaFactory.createForClass<T>(entity);
      schema.set(
        'timestamps',
        schema.get('timestamps') ?? {
          createdAt: 'createdAt',
          updatedAt: 'lastModifiedAt',
        },
      );
      const toObject: ToObjectOptions = {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {
          delete ret._id;
          Object.entries(ret).forEach(([key, value]) => {
            if (value instanceof mongoose.Types.ObjectId) {
              ret[key] = value.toString();
              return;
            }
            if (
              Array.isArray(value) &&
              value.some((val) => val instanceof mongoose.Types.ObjectId)
            ) {
              value.forEach((element, index) => {
                if (!(element instanceof mongoose.Types.ObjectId)) {
                  return;
                }
                value[index] = element.toString();
              });
            }
          });

          const instance = plainToClass(entity, ret);
          ModelUtils.setAsEntity(instance);
          return ModelUtils.wrapProxy(instance);
        },
      };
      schema.set('toJSON', schema.get('toJSON') ?? toObject);
      schema.set('toObject', schema.get('toObject') ?? toObject);
      return { name: entity.name, schema };
    });
  }
}
