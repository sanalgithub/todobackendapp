import { BaseModel } from "@app/common/database/model/base.model";
export declare class ModelUtils {
    static isEntity<T extends BaseModel>(entity: T): boolean;
    static setAsEntity<T extends BaseModel>(entity: T): void;
    static isModified<T extends BaseModel>(entity: T): boolean;
    static setModified<T extends BaseModel>(entity: T): void;
    static wrapProxy<T extends BaseModel>(entity: T): T;
    static getIds(entities: BaseModel[] | string[]): string[];
}
