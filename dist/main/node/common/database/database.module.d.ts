import { DynamicModule, Type } from '@nestjs/common';
import { BaseModel } from '@app/common/database/model/base.model';
export declare class DataBaseModule {
    static forRoot(): Promise<DynamicModule>;
    static forFeature<T extends BaseModel>(...entities: Type<T>[]): Promise<DynamicModule>;
    private static getModelDefinitions;
}
